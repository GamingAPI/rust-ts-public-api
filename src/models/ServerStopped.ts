

class ServerStopped {
  private _timestamp: string;
  private _additionalProperties?: Map<String, object | string | number | Array<unknown> | boolean | null>;

  constructor(input: {
    timestamp: string,
  }) {
    this._timestamp = input.timestamp;
  }

  get timestamp(): string { return this._timestamp; }
  set timestamp(timestamp: string) { this._timestamp = timestamp; }

  get additionalProperties(): Map<String, object | string | number | Array<unknown> | boolean | null> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<String, object | string | number | Array<unknown> | boolean | null> | undefined) { this._additionalProperties = additionalProperties; }

  public marshal() : string {
    let json = '{'
    if(this.timestamp !== undefined) {
      json += `"timestamp": ${typeof this.timestamp === 'number' || typeof this.timestamp === 'boolean' ? this.timestamp : JSON.stringify(this.timestamp)},`; 
    }
  
    if(this.additionalProperties !== undefined) { 
      for (const [key, value] of this.additionalProperties.entries()) {
        //Only render additionalProperties which are not already a property
        if(Object.keys(this).includes(String(key))) continue;
        json += `"${key}": ${typeof value === 'number' || typeof value === 'boolean' ? value : JSON.stringify(value)},`;
      }
    }

    //Remove potential last comma 
    return `${json.charAt(json.length-1) === ',' ? json.slice(0, json.length-1) : json}}`;
  }

  public static unmarshal(json: string | object): ServerStopped {
    const obj = typeof json === "object" ? json : JSON.parse(json);
    const instance = new ServerStopped({} as any);

    if (obj["timestamp"] !== undefined) {
      instance.timestamp = obj["timestamp"];
    }

    //Not part of core properties
  
    if (instance.additionalProperties === undefined) {instance.additionalProperties = new Map();}
    for (const [key, value] of Object.entries(obj).filter((([key,]) => {return !["timestamp"].includes(key);}))) {
    
      instance.additionalProperties.set(key, value as any);
    }
    return instance;
  }
}
export default ServerStopped;
