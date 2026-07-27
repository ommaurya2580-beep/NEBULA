import { EventBus } from './EventBus';
describe('EventBus', () => {
  it('should subscribe and publish events', () => {
    const bus = EventBus.getInstance();
    bus.publish('test');
  });
});
