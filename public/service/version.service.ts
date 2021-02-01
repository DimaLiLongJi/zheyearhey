import { Injectable, InjectionToken } from "@indiv/di";

let a = 0;

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private lastVersion: string = 'v4.2.0';

  constructor() {
    a ++;
    console.log(22, '测试 providedIn: root 的渲染次数，应该为1', a);
  }

  public getLastVersion(): string {
    return this.lastVersion;
  }
}

export const versionToken = new InjectionToken<string>('versionToken', {
  providedIn: 'root',
  factory: () => {
    console.log(2222222222, '来自InjectionToken versionToken');
    return 'v4.2.0';
  }
})
