import {createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator/jest';
import {ConverterComponent} from './converter.component';
import {MockComponent} from 'ng-mocks';
import {MdbIconComponent, ModalDirective} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

describe('ConverterComponent', () => {
  let spectator: Spectator<ConverterComponent>;
  let component: ConverterComponent;
  let toastr: ToastrService;
  let fromElem;
  let toElem;
  let fromNative;
  let toNative;

  const submitForm = () => spectator.click('button[type="submit"]');

  const createComponent = createComponentFactory({
    component: ConverterComponent,
    imports: [ReactiveFormsModule, FormsModule],
    declarations: [
      MockComponent(MdbIconComponent),
      MockComponent(ModalDirective)
    ],
    providers: [
      mockProvider(ToastrService, {
        error: (msg) => null
      })
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    toastr = spectator.inject(ToastrService);
    fromElem = component.fromField;
    toElem = component.toField;
    fromNative = fromElem.nativeElement;
    toNative = toElem.nativeElement;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('keyboard shortcuts', () => {

    it('focuses the `from` field', () => {
      spectator.dispatchKeyboardEvent(document, 'keypress', '[');
      expect(fromElem.nativeElement).toBeFocused();
    });

    it('focuses the `to` field', () => {
      spectator.dispatchKeyboardEvent(document, 'keypress', ']');
      expect(toElem.nativeElement).toBeFocused();
    });

    it('clears the form and blurs input elements', () => {
      spectator.typeInElement('cup', fromElem);
      spectator.typeInElement('tbsp', toElem);
      spectator.dispatchKeyboardEvent(document, 'keypress', 'x');
      expect(fromNative).not.toBeFocused();
      expect(toNative).not.toBeFocused();
      expect(fromNative.value).toBe('');
      expect(toNative.value).toBe('');
    });

    it('opens the examples modal', () => {
      spyOn(component.examplesModal, 'show');
      spectator.dispatchKeyboardEvent(document, 'keypress', 'E');
      expect(component.examplesModal.show).toHaveBeenCalled();
    });

    it('opens the shortcuts modal', () => {
      spyOn(component.shortcutsModal, 'show');
      spectator.dispatchKeyboardEvent(document, 'keypress', 'S');
      expect(component.shortcutsModal.show).toHaveBeenCalled();
    });
  });

  describe('when converting', () => {

    beforeEach(() => {
      spyOn(toastr, 'error');
      spyOn(component, 'blur');
    });

    it('fails to convert incompatible units', () => {
      spectator.typeInElement('m3', fromElem);
      spectator.typeInElement('m', toElem);
      submitForm();
      expect(toastr.error).toHaveBeenCalledWith('Incompatible units: m3 and m');
      expect(component.blur).toHaveBeenCalled();
    });

    it('fails to convert nonexistent units', () => {
      spectator.typeInElement('g', fromElem);
      spectator.typeInElement('fake', toElem);
      submitForm();
      expect(toastr.error).toHaveBeenCalledWith('Unit not recognized');
      expect(component.blur).toHaveBeenCalled();
    });

    it('converts units', () => {
      spectator.typeInElement('g', fromElem);
      spectator.typeInElement('kg', toElem);
      submitForm();
      expect(component.blur).toHaveBeenCalled();
      expect(component.output).toEqual('0.001 kg');
    });
  });
});
