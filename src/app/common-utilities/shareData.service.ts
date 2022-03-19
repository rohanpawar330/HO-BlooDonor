import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShareDataService {
    //  to not mess with subject we use it as private and data$ as public
    private data = new Subject<any>();
    public data$ = this.data.asObservable();

    emitdata(x: any) {
        this.data.next(x);
    }
}  