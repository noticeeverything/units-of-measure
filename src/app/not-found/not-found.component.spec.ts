import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { NotFoundComponent } from './not-found.component';

describe('AppComponent', () => {
    let spectator: Spectator<NotFoundComponent>;
    const createComponent = createRoutingFactory({
        component: NotFoundComponent,
    });

    it('should create', () => {
        spectator = createComponent();
        expect(spectator.component).toBeTruthy();
    });
});
