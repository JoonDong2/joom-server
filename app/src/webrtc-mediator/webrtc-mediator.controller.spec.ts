import { Test, TestingModule } from '@nestjs/testing';
import { WebrtcMediatorController } from './webrtc-mediator.controller';

describe('WebrtcMediatorController', () => {
  let controller: WebrtcMediatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebrtcMediatorController],
    }).compile();

    controller = module.get<WebrtcMediatorController>(WebrtcMediatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
