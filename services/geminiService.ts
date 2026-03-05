
import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem, QuizQuestion } from "../types";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export const getRecommendation = async (userInputs: {
  mood: string;
  taste: string;
  hunger: string;
}): Promise<{ recommendation: string; items: MenuItem[] }> => {
  const menuContext = MENU_ITEMS.map(item => `${item.name} (${item.category}): ${item.description} - tagy: ${item.tags.join(', ')}`).join('\n');

  const prompt = `Jsi duše moderní hipsterské kavárny "Ka(f)árna Vlašim". Tvým úkolem je na základě nálady a preferencí zákazníka doporučit ideální kombinaci z našeho lístku.

Vstup od uživatele:
- Aktuální nálada/emoce: ${userInputs.mood}
- Chuťový profil: ${userInputs.taste}
- Má hlad na něco sladkého?: ${userInputs.hunger}

Nabídka kavárny:
${menuContext}

Pravidla:
1. Odpověz česky, přátelským a inspirativním tónem, který "hladí po duši".
2. Doporuč jeden hlavní nápoj a případně jeden dezert, který k němu perfektně ladí.
3. Pokud uživatel chce experimentovat nebo hledá něco nového, doporuč "Speciální sezónní nabídka" a řekni mu, ať se zeptá obsluhy.
4. Pokud uživatel chce něco sladkého, doporuč "Něco slaďoučkého" a vysvětli, že aktuální výběr najde ve vitríně nebo u obsluhy. Nepoužívej konkrétní názvy dezertů, které nejsou v seznamu výše.
5. Vysvětli, proč jsi vybral/a právě tyto položky (vztáhni to k jejich složení nebo tónu).
6. Buď stručný/á, ale poetický/á.

Vrať JSON formát.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reasoning: { type: Type.STRING, description: 'Krátké zdůvodnění výběru.' },
            recommendedItemNames: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'Názvy položek z menu.' 
            },
          },
          required: ["reasoning", "recommendedItemNames"],
        },
      },
    });

    const result = JSON.parse(response.text);
    const recommendedItems = MENU_ITEMS.filter(item => 
      result.recommendedItemNames.some((name: string) => name.toLowerCase().includes(item.name.toLowerCase()))
    );

    return {
      recommendation: result.reasoning,
      items: recommendedItems,
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      recommendation: "Vypadá to, že dnes by ti udělalo největší radost naše klasické Cappuccino a něco slaďoučkého z naší vitríny.",
      items: [MENU_ITEMS[2], MENU_ITEMS[13]], // Cappuccino and Něco slaďoučkého
    };
  }
};

export const getQuizQuestions = async (topic: string): Promise<QuizQuestion[]> => {
  const prompt = `Jsi kvízmaster v kavárně Ka(f)árna Vlašim. Vygeneruj 5 zajímavých kvízových otázek na téma: ${topic}.
  Otázky by měly být zábavné, ne příliš těžké, ale poučné. 
  Každá otázka musí mít 4 možnosti, jednu správnou odpověď a krátké zajímavé vysvětlení.
  Odpověz česky v JSON formátu.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Quiz Gemini Error:", error);
    return [];
  }
};
