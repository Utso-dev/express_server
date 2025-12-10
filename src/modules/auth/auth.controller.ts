
import { Request, Response } from "express";
import { authServices } from "./auth.services";

const login =async (req: Request, res: Response) => {
        // login logic here
        const {email, password} = req.body;
        try {
            const result = await authServices.loginUser(email, password);
            res.status(200).json({
                message: 'Login successful',
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal Server Error',
                success: false,
                details: error
            });
            return;
        }
}



export const authController = {
    login
};