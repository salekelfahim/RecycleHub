import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-exchange',
  standalone: true,
  templateUrl: './exchange.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './exchange.component.css'
})
export class ExchangeComponent implements OnInit {
  userPoints: number = 0;
  exchangeOptions = [
    { points: 100, reward: "Bon d'achat de 50 Dh" },
    { points: 200, reward: "Bon d'achat de 120 Dh" },
    { points: 500, reward: "Bon d'achat de 350 Dh" }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userPoints = user?.points ?? 0;
  }

  exchangePoints(cost: number) {
    if (this.userPoints >= cost) {
      this.userPoints -= cost;

      Swal.fire({
        icon: 'success',
        title: 'Échange réussi !',
        text: `Vous avez échangé ${cost} points.`,
        confirmButtonColor: '#2E7D32'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Échange impossible',
        text: "Vous n'avez pas assez de points.",
        confirmButtonColor: '#d33'
      });
    }
  }
}
