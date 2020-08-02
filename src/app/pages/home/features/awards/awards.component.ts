import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../../../core/services/modal.service";
import { ModalAwardsComponent } from "./modal-awards/modal-awards.component";
import { StorageService } from "../../../../core/services/storage.service";
import { HttpService } from "../../../../core/services/http.service";

@Component({
  selector: "app-awards",
  templateUrl: "./awards.component.html",
  styleUrls: ["./awards.component.scss"],
})
export class AwardsComponent implements OnInit {
  tabs = [
    { id: 1, name: "En progreso" },
    { id: 2, name: "Finalizados" },
  ];
  tab_show = 1;
  completed = [];
  inProgress = [];
  completedItems =false;
  inProgressItems = false;
  userChallenges = {
    descriptionOne: "",
    descriptionTwo: "",
    json: [],
    status: "",
    titleOne: "",
    titleTwo: "",
    type: "",
  };

  constructor(
    private modalService: ModalService,
    private storageService: StorageService,
    private httpServide: HttpService
  ) {}

  ngOnInit(): void {
    this.getUserChallenges();
  }

  tabSelected(tab) {
    if (tab.id == 1) {
      this.tab_show = 1;
    } else {
      this.tab_show = 0;
    }
  }

  open(i, modal: "in-progress" | "completed") {
    switch (modal) {
      case "completed":
        this.modalService.open(
          {
            component: ModalAwardsComponent,
            title: "Premios",
            data: { modal: modal, id: i, array: this.completed },
          },
          { width: 376, height: 584, disableClose: true }
        );
        break;
      case "in-progress":
        this.modalService.open(
          {
            component: ModalAwardsComponent,
            title: "Premios",
            data: { modal: modal, id: i, array: this.inProgress },
          },
          { width: 376, height: 584, disableClose: true }
        );
        break;
    }
  }

  getUserChallenges() {
    const sibUserId = this.storageService.getCurrentUser().userId;
    this.httpServide
      .post("canales", `messagesrewards/challenges/user/${sibUserId}`, {
        channelId: 102,
        usuId: sibUserId,
      })
      .subscribe((resp) => {
        this.userChallenges = resp;
        this.getArrays();
      });
  }

  getArrays(){
    this.userChallenges.json.forEach((award) => {
      if (award.completed) {
        this.completedItems = true;
        this.completed.push(award);
      } else {
        this.inProgressItems = true;
        this.inProgress.push(award);
      }
    });
  }
}
