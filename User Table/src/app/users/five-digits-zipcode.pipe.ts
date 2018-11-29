import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fiveDigitsZipcode"
})
export class FiveDigitsZipcodePipe implements PipeTransform {
  transform(zipcode: string): string {
    // Only taking the first five characters in the zipcode
    return zipcode.substring(0, 5);
  }
}
