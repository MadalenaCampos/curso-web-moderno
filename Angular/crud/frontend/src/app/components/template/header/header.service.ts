import { HeaderData } from "./header-data.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  private _headerData = new BehaviorSubject<HeaderData>({
    // HeaderData é uma instancia privada de BehaviorSubject<HeaderData>, e dentro dela há os dados do header, aqueles que estão presentes em header-data.module.ts
    // BehaviorSubject é uma classe, que precisa de um valor inicial e que estende subject, que é o "porteiro" da historia, quem detecta o evento e notificar os observadores, sempre que houver uma mudança nos dados ele emite um evento
    title: "Início",
    icon: "home",
    routeUrl: "",
  });

  constructor() {}

  get headerData(): HeaderData {
    return this._headerData.value;
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData);
  }
}
