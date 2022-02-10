import { Test, TestingModule } from '@nestjs/testing';
import { WebrtcMediatorGateway } from './webrtc-mediator.gateway';

describe('WebrtcMediatorGateway', () => {
  let gateway: WebrtcMediatorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebrtcMediatorGateway],
    }).compile();

    gateway = module.get<WebrtcMediatorGateway>(WebrtcMediatorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
