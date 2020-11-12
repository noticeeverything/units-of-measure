import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { FooterComponent } from './footer.component';
import { MockComponent } from 'ng-mocks';
import { MdbIconComponent } from 'angular-bootstrap-md';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let spectator: Spectator<FooterComponent>;

    const createComponent = createComponentFactory({
        component: FooterComponent,
        declarations: [MockComponent(MdbIconComponent)],
    });

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });
});
