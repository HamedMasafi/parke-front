export class ShamsiCalendar {
  constructor() {
    this.cycle_days = 1029983;
    this.cycle_years = 2820;
    this.year_length = 365.24219858156028368;
    this.hijri_shamsi_epoch = 2121446;
    this.leap_threshold = 0.24219858156028368;
  }

  cycle_start (jdn){
    var era = parseInt( this.cycle(jdn));
    var start = parseInt( this.hijri_shamsi_epoch + era * this.cycle_days);
    return parseInt(start);
  }

  cycle (jdn){
    var offset = parseInt( jdn - this.hijri_shamsi_epoch);
    var cycle_no = parseInt( offset / this.cycle_days);
    if(offset < 0) {
      --cycle_no;
    }
    return parseInt(cycle_no);
  }
  fdoy_c (year,cycleNo){
    var d_c = parseFloat( (year * this.year_length));

    var fdoy_c_n = parseInt( (Math.floor(d_c)));
    return parseInt(this.hijri_shamsi_epoch + cycleNo * this.cycle_days + fdoy_c_n );
  }
  fdoy (year){

    var c = parseInt( year / this.cycle_years);

    var fdoy_c ;

    var d_c ;
    year -= 475;
    if(year < 0) {
      c--;
    }
    year -= (c * this.cycle_years);
    d_c = (year * this.year_length);
    fdoy_c = (Math.floor(d_c));
    return parseInt(this.hijri_shamsi_epoch + c * this.cycle_days + fdoy_c );
  }

  is_leap(year){
    var integral ;
    var frac ;
    frac = Math.floor((year + 2346) * this.leap_threshold);
    integral = parseInt((year + 2346) * this.leap_threshold);
    if(frac < this.leap_threshold) {
      return 1;
    } else {
      return 0;
    }
  }
  days_in_month (month,year){
    if(month > 0 && month <= 12) {
      return month < 7 ? 31 : month < 12 || this.is_leap(year) ? 30 : 29;
    }

    return 0;
  }
//fn cycle removed from this file
  days_in_year(year){
    return this.is_leap(year) ? 366 : 365;
  }
  month_in_year(year){
    return 12;
  }
  is_valid(year,month,day){
    if(year < 0)
      ++year;
    if(day > 0 && day <= this.days_in_month(month, year)) {
      return 1;
    }
    return 0;
  }
//fn cycle_start removed from this file
//fn fdoy_c removed from this file
//fn fdoy removed from this file

  setDate(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
  parse(date) {
    let parts = date.split('/')
    if (parts.length !== 3)
      return;

    this.year = parseInt(parts[0])
    this.month = parseInt(parts[1])
    this.day = parseInt(parts[2])
  }
  get jdn(){
    let year = this.year;
    let month = this.month;
    let day = this.day;

    var era = 0;
    var d_y = 0;
    var y_c = 0;
    var f_d = 0;
    var i = 0;
    if(year < 0) {
      ++year;
    }
    era = (year - 475) / this.cycle_years;
    if((year - 475) < 0) {
      --era;
    }
    y_c = (year - 475) - era * this.cycle_years;
    f_d = this.fdoy_c(y_c, era);
    d_y = 0;
    for(i = 1; i < month; ++i) {
      d_y += this.days_in_month(i, year);
    }
    d_y += day;
    return  f_d + d_y - 1;
  }
  from_jdn(jd){
    var c = parseInt( this.cycle(jd));
    var y_c = parseInt( (Math.floor((jd - this.cycle_start(jd)) / this.year_length)));
    var y = parseInt( y_c + 475 + c * 2820);
    var d = parseInt( jd - this.fdoy_c(y_c, c) + 1);
    var m = 0;
    if(d > this.days_in_year(y)) {
      y++;
      d = 1;
    }
    if(y <= 0) {
      y--;
    }
    for(m = 1; m < 12; ++m) {
      if(d > this.days_in_month(m, y)) {
        d -= this.days_in_month(m, y);
      } else {
        break;
      }
    }
    this.year = y;
    this.month = m;
    this.day = d;
  }

  toString() {
    return `${this.year}/${this.month}/${this.day}`
  }
  to_gr(j,g){
    var jdn = 0;
    jdn = this.to_jdn(j);
    jdn_to_gr(jdn, g);
  }
  // Cal_gr.prototype.to_sh(g,j){
  //   var jdn = 0;
  //   jdn = gr_to_jdn(g);
  //   jdn_to_sh(jdn, j);
  // }

}
