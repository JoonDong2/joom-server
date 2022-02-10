import { Test, TestingModule } from '@nestjs/testing';
import { WebrtcMediatorService } from './webrtc-mediator.service';

describe('WebrtcMediatorService', () => {
  let service: WebrtcMediatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebrtcMediatorService],
    }).compile();

    service = module.get<WebrtcMediatorService>(WebrtcMediatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
