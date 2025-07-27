import { Component, OnInit } from '@angular/core';
import { TravelService, Travel } from 'src/app/services/travel.service';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommentModalComponent } from '../../comment-modal.component'; 
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-travels-list',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './travels-list.page.html',
  styleUrls: ['./travels-list.page.scss']
})
export class TravelsListPage implements OnInit {
  travels: Travel[] = [];
  filteredTravels: Travel[] = [];
  selectedType: 'to-do' | 'done' = 'to-do';

  priorityOrder: 'none' | 'asc' | 'desc' = 'none';  

  constructor(
    private travelService: TravelService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.loadTravels();
  }

  async loadTravels() {
    const loading = await this.loadingCtrl.create({ message: 'A carregar viagens...' });
    await loading.present();

    this.travelService.getTravels().subscribe({
      next: async (data) => {
        this.travels = data;
        this.applyFilter();
        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Erro ao carregar viagens',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  selectType(type: 'to-do' | 'done') {
    this.selectedType = type;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredTravels = this.travels.filter(t => t.state === this.selectedType);
    this.orderByPriority();
  }

  orderByPriority() {
    if (this.priorityOrder === 'asc') {
      this.filteredTravels.sort((a, b) => this.priorityValue(a.type) - this.priorityValue(b.type));
    } else if (this.priorityOrder === 'desc') {
      this.filteredTravels.sort((a, b) => this.priorityValue(b.type) - this.priorityValue(a.type));
    }
  }

  priorityValue(priority?: string): number {
    switch(priority) {
      case 'high': return 3;
      case 'normal': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }

  getPriorityColor(type?: string): string {
    switch(type) {
      case 'high': return 'priority-high';
      case 'normal': return 'priority-normal';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  async ionViewWillEnter() {
    await this.loadTravels();
  }

  async openAddComment(travelId: string) {
    const modal = await this.modalCtrl.create({
      component: CommentModalComponent,
      componentProps: { travelId }
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data) {
      }
    });
    return await modal.present();
  }

  deleteTravel(id: string) {
    if (confirm('Tem certeza que quer eliminar esta viagem?')) {
      this.travelService.deleteTravel(id).subscribe({
        next: () => this.loadTravels(),
        error: () => alert('Erro ao eliminar a viagem.')
      });
    }
  }

 toggleTravelState(travel: Travel) {
  const newState: 'to-do' | 'done' = travel.state === 'to-do' ? 'done' : 'to-do';

  this.travelService.updateTravelState(travel.id!, newState).subscribe({
    next: (updatedTravel: Travel) => {
      travel.state = updatedTravel.state;
      console.log(`Viagem ${travel.id} atualizada para: ${updatedTravel.state}`);

      this.applyFilter();
    },
    error: (err: any) => {
      console.error('Erro ao atualizar o estado da viagem:', err);
    }
  });
}




}
