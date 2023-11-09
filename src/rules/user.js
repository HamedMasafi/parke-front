
export function nameRule(v) {
  if (!!v)
    return true
  return "نام را وارد کنید"
}

export function lastNameRule(v) {
  if (!!v)
    return true
  return "نام خانوادگی را وارد کنید"
}

export function phoneRule(v) {
  if (!!v) {
    if (v.length === 13)
      return true;
    else
      return "شماره موبایل صحیح نیست"
  }
  return "شماره موبایل را وارد کنید"
}

export function nationalCodeRule(v) {
  if (!!v) {
    if (v.length === 10)
      return true;
    else
      return "کد ملی صحیح نیست"
  }
  return "کد ملی را وارد کنید"
}

export function passwordRule(v) {
  if (!!v) {
    if (v.length >= 6)
      return true;
    else
      return "طول کلمه عبور باید حداقل ۶ کاراکتر باشد"
  }
  return "کلمه عبور را وارد کنید"
}
