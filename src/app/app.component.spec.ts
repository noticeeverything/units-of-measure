import {Spectator} from '@ngneat/spectator';
import {createComponentFactory} from '@ngneat/spectator/jest';
import {AppComponent} from './app.component';
import {MockComponent} from 'ng-mocks';
import {FooterComponent} from './footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {Title} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [
      MockComponent(FooterComponent),
      MockComponent(RouterOutlet),
      MockComponent(NotFoundComponent)
    ],
    componentMocks: [Title]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('has a footer component', () => {
    expect(spectator.query(FooterComponent)).toBeTruthy();
  });

  it('has a router outlet', () => {
    expect(spectator.query(RouterOutlet)).toBeTruthy();
  });

  it('has a title', () => {
    expect(spectator.query('h1')).toHaveExactText('Easy Unit Converter');
  });

  it('has a byline', () => {
    expect(spectator.query('p.lead')).toHaveExactText('by Notice Everything Creative');
  });

  it('links to our website', () => {
    expect(spectator.query('.container a')).toContainProperty('href', 'https://noticeeverything.com');
  });
});
