import { Types } from 'mongoose';
export declare class UpdateTaskInput {
    id: Types.ObjectId;
    title: string;
    description?: string;
    isCompleted: boolean;
}
