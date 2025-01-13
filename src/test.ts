import "reflect-metadata";

function Inject(key: string) {
  return (target: Function) => {
    Reflect.defineMetadata(key, 1, target);
    const meta = Reflect.getMetadata(key, target);
  };
}

function Prop(target: Object, name: string) {
  Reflect.defineMetadata(name, 123, target);
}

@Inject("tes")
export class C {
  @Prop prop: number;
}

console.log(new C().prop);
