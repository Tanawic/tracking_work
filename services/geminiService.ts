
import { GoogleGenAI, Type } from "@google/genai";
import type { Task } from '../types';
import { Status, Priority } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateTasksFromPrompt = async (prompt: string): Promise<Omit<Task, 'id'>[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following high-level goal, break it down into smaller, actionable tasks. For each task, provide a title, a short description, and a priority level (Low, Medium, or High). All tasks should have a status of 'To Do'.
            Goal: "${prompt}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: {
                                type: Type.STRING,
                                description: "The concise title of the task.",
                            },
                            description: {
                                type: Type.STRING,
                                description: "A brief description of what the task involves.",
                            },
                            priority: {
                                type: Type.STRING,
                                description: "The priority of the task: Low, Medium, or High.",
                                enum: ["Low", "Medium", "High"]
                            },
                        },
                        required: ["title", "description", "priority"],
                    },
                },
            },
        });

        const jsonStr = response.text.trim();
        const generatedTasks = JSON.parse(jsonStr);

        return generatedTasks.map((task: any) => ({
            title: task.title,
            description: task.description,
            status: Status.ToDo,
            priority: task.priority as Priority,
        }));

    } catch (error) {
        console.error("Error generating tasks with Gemini:", error);
        throw new Error("Failed to generate tasks. Please check your API key and try again.");
    }
};
