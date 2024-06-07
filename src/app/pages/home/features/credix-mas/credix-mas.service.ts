import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http.service";
import { StorageService } from "src/app/core/services/storage.service";
import { TagsService } from "src/app/core/services/tags.service";
import { AccountInfo } from "src/app/shared/models/credix-mas-info";
import { Tag } from "src/app/shared/models/tag";

@Injectable({
  providedIn: "root",
})
export class CredixMasService {
  private readonly URL_ACCOUNT_INFO = "account/credixmasinfo";
  private readonly URL_SUBSCRIBE = "account/subscribecredixmas";

  constructor(private http: HttpService, private storage: StorageService) {}

  _info: AccountInfo = {} as AccountInfo;
  _tags: Tag[] = [];
  _notification: { title: string; message: string; type: string };
  _subscribeResponse: {
    type: "success" | "error";
    message: string;
    title: string;
  };
  private _subscription: boolean = false;

  toggleSubscription(value: boolean): void {
    this._subscription = value;
  }

  get subscription(): boolean {
    return this._subscription;
  }

  get info(): AccountInfo {
    return this._info;
  }

  get notification(): { title: string; message: string; type: string } {
    return this._notification;
  }

  get response(): {
    title: string;
    message: string;
    type: "success" | "error";
  } {
    return this._subscribeResponse;
  }

  getTag(desc): string {
    return this._tags.find((el) => (el.description = desc)).value;
  }

  getBenefits(): Tag[] {
    return this._tags.filter((el) =>
      el.description.includes("credixmas.benefits")
    );
  }

  getAccountInfo() {
    return this.http
      .post("canales", this.URL_ACCOUNT_INFO, {
        accountId: this.storage.getCurrentUser().actId,
      })
      .pipe(
        map((response) => {
          if (response.type == "success") {
            this._info = response.json;
            this._notification = undefined;
            if (response.json.activationDate) {
              this.toggleSubscription(true);
            } else {
              this.toggleSubscription(false);
            }
          } else {
            this._info = undefined;
            this.toggleSubscription(false);
            this._notification = {
              type: response.type,
              title: response.json.titleOne,
              message: response.json.descriptionOne,
            };
          }
        })
      );
  }

  subscribe() {
    return this.http
      .post("canales", this.URL_SUBSCRIBE, {
        accountId: this.storage.getCurrentUser().actId,
      })
      .pipe(
        map((response) => {
          console.log("subscribe", response);
          if (!response.type || response.type === "error") {
            this._subscribeResponse = {
              type: "error",
              title: "Error",
              message: response.message,
            };
          } else {
            this._subscribeResponse = {
              type: "success",
              title: response.json.titleOne,
              message: response.json.descriptionOne,
            };
          }
        })
      );
  }

  setTags(value: Tag[]) {
    this._tags = value;
  }
}
