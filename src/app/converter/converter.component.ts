import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as Qty from 'js-quantities';
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'uom-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
    convertForm = this.formBuilder.group({
        from: ['', Validators.required],
        to: ['', Validators.required],
    });

    @ViewChild('examplesModal') examplesModal: ModalDirective;

    @ViewChild('fromField') fromField: ElementRef;

    @ViewChild('shortcutsModal') shortcutsModal: ModalDirective;

    output: string | number;

    @ViewChild('toField') toField: ElementRef;

    constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {}

    blur() {
        [this.fromField.nativeElement, this.toField.nativeElement].forEach((i) => i.blur());
    }

    clear() {
        this.output = undefined;
        this.blur();
        this.convertForm.reset();
    }

    convert() {
        this.output = undefined;
        try {
            const qty: Qty = Qty(`${this.convertForm.get('from').value}`).to(
                this.convertForm.get('to').value,
            );
            this.output = qty.toString();
            this.blur();
        } catch (e) {
            this.toastr.error(e.message);
            this.blur();
        }
    }

    @HostListener('document:keypress', ['$event'])
    keypress(ev: KeyboardEvent) {
        switch (ev.key) {
            case 'x':
                if (this.convertForm.dirty) {
                    this.blur();
                    this.clear();
                }
                break;

            case '[':
                ev.preventDefault();
                this.fromField.nativeElement.focus();
                this.convertForm.markAsDirty();
                break;

            case ']':
                ev.preventDefault();
                this.toField.nativeElement.focus();
                this.convertForm.markAsDirty();
                break;

            case 'E':
                ev.preventDefault();
                this.examplesModal.show();
                break;

            case 'S':
                ev.preventDefault();
                this.shortcutsModal.show();
                break;

            default:
                return;
        }
    }
}
