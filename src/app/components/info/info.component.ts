import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export interface Wymaganie {
  wymaganie: string;
  uzasadnienie: string;
}

const DATA : Wymaganie[] = [
  {wymaganie: "Serwis może być zrealizowany na bazie HTML 4.01 lub XHTML (dopuszczalne jest też użycie XML+XSLT). Strony muszą być utworzone poprawnie i mieć poprawne deklaracje typu – będą przepuszczane przez walidator w ramach testu.",
    uzasadnienie: "Strona bazuje na HTML5, co zostało dopuszczone i zalecone na Forum Dyskusyjnym przedmiotu. Wygenerowany HTML pomyślnie przeszedł kontrolę walidatorem udostępnionym przez Prowadzącego."},
  {wymaganie: "Wymagane jest nietrywialne formatowanie przy użyciu CSS. Poprawność reguł CSS również będzie sprawdzana walidatorem.",
    uzasadnienie: "W projekcie zastosowano Angular Material, co ułatwiło stylowanie strony. Formatowanie CSS zostało zastosowane do personalizacji wyglądu osi czasu. Walidacja CSS nie wykazała żadnych błędów."},
  {wymaganie: "Kompatybilność i „łagodna degradacja” - serwis powinien funkcjonować poprawnie i wyglądać dobrze we wszystkich popularnych przeglądarkach (najnowsze wersje), a korzystanie z serwisu powinno być też możliwe – choć zapewne nie bez zakłóceń w rodzaju nieudanego formatowania – w przeglądarkach starszych lub bardziej prymitywnych pod względem możliwości prezentacyjnych (np. lynx). W przypadku podjęcia decyzji o użyciu XHTML 1.1 wystarczy obsługa przez przeglądarki respektujące ten standard.",
    uzasadnienie: "Strona zadziała poprawnie na nowszych wersjach przeglądarek. Nie zostało zweryfikowane jej działanie na starszych przeglądarkach"},
  {wymaganie: "Dostępność dla niepełnosprawnych – w szczególności powinna być możliwa nawigacja przy użyciu oprogramowania czytającego (a zatem wszystkie istotne obrazki powinny mieć teksty alternatywne, itp.). Oczywiście biorąc pod uwagę skalę projektu nie możemy przesadzać z rozmachem – np. nie jest wymagane dostarczenie reguł CSS dla medium aural.",
    uzasadnienie: "Dla istniejących na stronie przycisków i elementów interaktywnych zostały zastosowane teksty alternatywne. Test przy użyciu narzędzie Google Lighthouse dał rezultat 100/100 punktów"},
  {wymaganie: "Poza (X)HTML i CSS serwis powinien wykorzystywać co najmniej jedną wybraną technologię spośród przedstawionych na wykładzie (np. skrypty po stronie serwera i/lub klienta, ciasteczka, bazy danych, web serwisy, SSL... - do wyboru)",
    uzasadnienie: "Strona korzysta z napisanego samodzielnie REST API, które ma połączenie z bazą danych."},
  {wymaganie: "Serwis powinien zawierać dobrze przemyślany, wygodny i spójny system nawigacji. Co więcej, serwis powinien być na tyle duży, aby ten system miał sens – przypominamy o możliwości posiłkowania się wszelkiego rodzaju „materiałem zastępczym”.",
    uzasadnienie: "W celu zapewnienia prostoty używania systemy zdecydowano się na model single-page application, dzięki czemu wszystkie oferowane funkcje są widoczne i łatwo dostępne. Interakcja z użytwkonikiem zazwyczaj odbywa się za pomocą okien dialogowych."},
  {wymaganie: "Serwis musi zawierać stronę poświęconą opisowi samego serwisu – jakich technologii użyto, jakie były założenia przy planowaniu nawigacji, oraz dlaczego autor uważa, że strona spełnia wymagania wymienione w tym dokumencie.",
    uzasadnienie: "Stoworzona została strona z informacjami (która jest aktualnie wyświetlana) o użytych technologiach i komentarzem do każdego z wymagań. "},
  {wymaganie: "Przypominamy, że projektowany jest serwis internetowy, a więc strona, z której teoretycznie ktoś miałby korzystać. Nieczytelne zestawienia kolorów, mikroskopijne czcionki, migające irytująco obrazki itp. nie powinny występować – prosimy utworzyć stronę, która nie tyle próbuje pochwycić uwagę gościa (choć to pożądane), ile zaoferować mu wygodny dostęp do poszukiwanych treści.",
    uzasadnienie: "Strona została stworzona z wykorzystaniem stonowanej kolorystki, a same kompononety są wystarczająco duże, aby zapewnić komfort odczytu treści."},

]

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['wymaganie', 'uzasadnienie'];
  dataSource = DATA;

  openMainPage() {
    this.router.navigateByUrl("/");
  }
}
