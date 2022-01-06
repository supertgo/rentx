
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);
    const images_name = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ car_id: id, images_name });

    return res.status(201).send();
  }
}
