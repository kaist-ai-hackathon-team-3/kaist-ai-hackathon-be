import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClovaService {
  constructor(private httpService: HttpService) {}

  async postchat(data: any): Promise<any> {
    const newData = {
      messages: [
        {
          content: data.messages,
          role: 'user',
        },
      ],
    };

    const headers = {
      'X-NCP-CLOVASTUDIO-API-KEY':
        'NTA0MjU2MWZlZTcxNDJiY5cfv1nWk9U3HrCITPYSmGGtZCkEcUOiCpGYCGGFBq75',
      'X-NCP-APIGW-API-KEY': 'd04XtbK3yPlca71vDqUmgKRHyhhclvmrptVHktM9',
      'Content-Type': 'application/json',
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003',
          newData,
          { headers },
        ),
      );
      return response.data.result.message.content;
    } catch (error) {
      console.error('Error', error.response?.data || error.message);
      throw error;
    }
  }
}
