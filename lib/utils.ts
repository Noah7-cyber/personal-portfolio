export function cn(...v: Array<string | false | null | undefined>) { return v.filter(Boolean).join(' '); }
export function sanitize(v:string){return v.replace(/[<>]/g,'').trim();}
