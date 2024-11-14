import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { ControllerClass } from "../index.js";
import { questionsCollection } from "../../storage/index.js";
import { createQuestionSchema } from "../../schemas/index.js";

export async function createQuestion(this: ControllerClass, request:Request, response:Response) {
    const requestBody = request.body;
    // Save the question to the database
    const result = await questionsCollection.insertOne({
        title: requestBody.title,
        content: requestBody.content,
        options: requestBody.options,
    });
    if (result.acknowledged) {
        console.log("New question created successfully");
        return response.status(201).json({ message: "Question created successfully" });
    }
    console.error("Error occured at createQUestion: An unhandled error occured");
    return response.status(500).json({ message: "An unhandled error occured" });
}