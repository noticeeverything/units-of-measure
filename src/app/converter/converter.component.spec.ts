import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';
import {ConverterComponent} from './converter.component';
import {MockComponent} from 'ng-mocks';
import {MdbIconComponent, ModalDirective} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

describe('ConverterComponent', () => {
  let spectator: Spectator<ConverterComponent>;
  const createComponent = createComponentFactory({
    component: ConverterComponent,
    imports: [ReactiveFormsModule, FormsModule],
    declarations: [
      MockComponent(MdbIconComponent),
      MockComponent(ModalDirective)
    ],
    componentMocks: [
      ToastrService
    ]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
