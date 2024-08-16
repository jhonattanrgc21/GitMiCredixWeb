import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

export interface idPhotos {
  front: {
    base64: string | ArrayBuffer,
    type: string
  },
  back: {
    base64: string | ArrayBuffer,
    type: string
  }
}

@Component({
  selector: 'id-photo-upload-component',
  templateUrl: './id-photo-upload.component.html',
  styleUrls: ['./id-photo-upload.component.scss']
})
export class IdPhotoUploadComponent implements OnInit {
  @Output() goBack = new EventEmitter<void>()
  @Output() validateId = new EventEmitter<idPhotos>()
  @ViewChild('imageInput') imageInput: ElementRef;

  idSideStep: 'front' | 'back' = 'front'
  previewUrls: {front: string | ArrayBuffer | null, back: string | ArrayBuffer | null} = { front: null, back: null };

  idPhotos: idPhotos = {front: null, back: null}

  constructor() { }

  ngOnInit(): void { }

  back() {
    switch (this.idSideStep) {
      case 'front':
        this.goBack.emit()
        break;
      case 'back':
        this.idSideStep = 'front'
        break;
    }
  }

  continue() {
    if(!this.idPhotos[this.idSideStep])return

    switch (this.idSideStep) {
      case 'front':
        this.idSideStep = 'back'
        break;
      case 'back':
        this.validateId.emit(this.idPhotos)
        break;
    }
  }

  uploadFile() {
    this.imageInput.nativeElement.click()
  }

  processPhoto(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.idPhotos[this.idSideStep].base64 = reader.result
        this.idPhotos[this.idSideStep].type = file.type
        this.previewUrls[this.idSideStep] = reader.result
        this.imageInput.nativeElement.value = '';
      }
      reader.readAsDataURL(file);

    }
  }

  deletePhoto(){
    this.previewUrls[this.idSideStep] = null
    this.idPhotos[this.idSideStep] = null
  }
}
