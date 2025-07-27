import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
})
export class CreateTravelPage {
  travelForm: FormGroup;
  apiUrl = 'https://mobile-api-one.vercel.app/travels';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.travelForm = this.fb.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      state: ['', Validators.required],
      startAt: [''],
      endAt: ['']
    });
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'A criar viagem...' });
    await loading.present();

    const data = {
      ...this.travelForm.value,
      startAt: this.travelForm.value.startAt ? new Date(this.travelForm.value.startAt) : null,
      endAt: this.travelForm.value.endAt ? new Date(this.travelForm.value.endAt) : null,
      createdBy: 'twintravels@demo' // podes adaptar este valor
    };

    this.http.post(this.apiUrl, data).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({ message: 'Viagem criada com sucesso!', duration: 2000, color: 'success' });
        toast.present();
        this.travelForm.reset();
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Não foi possível criar a viagem.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }
}
