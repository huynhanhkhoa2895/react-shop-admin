import md5 from 'md5'
export function initId() : string{
    return md5(new Date().getTime().toString()+Math.random()+Math.random()+Math.random())
}
export function ucfirst(str: string){
    const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return str2
}
export function strtolower(str: string){
    return str.toLowerCase()
}
export function slug(Text : string)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')+"-"+(Math.round(new Date().getTime()*Math.random()*Math.random()*Math.random())).toString().substring(0, 5);
}
export function validURL(str : any) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }
export const toBase64 = (file : any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
export const text_truncate = function(str : any, length : any, ending : any) {
    if(str != null && str != ""){
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    }
    return str;
};
export function empty(value : any){
  if(value instanceof Array){
    if(value.length === 0) return true;
  }
  if(value == null) return true
  switch(typeof value){
    case "object":
      if(Object.keys(value).length === 0) {
        return true
      }      
    break;
    case "boolean":
      if(!value) {
        return true
      }      
    break;
    default:
      if(value == null || value == '' ||typeof value === undefined){
        return true;
      }
  }
  return false
}