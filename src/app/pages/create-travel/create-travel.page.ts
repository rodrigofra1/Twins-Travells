import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TravelService, Travel } from 'src/app/services/travel.service';

@Component({
  selector: 'app-create-travel',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
})
export class CreateTravelPage {
  travel: Travel = {
  description: '',
  type: 'normal',     
  state: 'to-do',   
  startAt: null,
  endAt: null,
  createdBy: '',
  prop1: '',
  prop2: '',
  prop3: '',
};


  constructor(
    private travelService: TravelService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async saveTravel() {
    const loading = await this.loadingCtrl.create({ message: 'A guardar viagem...' });
    await loading.present();

    this.travelService.createTravel(this.travel).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({ message: 'Viagem guardada com sucesso!', duration: 2000, color: 'success' });
        await toast.present();
        this.router.navigateByUrl('/travels-list');
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Erro ao guardar viagem. Tenta novamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
