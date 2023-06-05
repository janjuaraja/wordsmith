function convertArabicToRoman(num: number): string {
    const romanNumerals: Record<string, number> = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
  
    let converted = '';
  
    for (const key in romanNumerals) {
      if (romanNumerals.hasOwnProperty(key)) {
        const value = romanNumerals[key];
  
        while (num >= value) {
          converted += key;
          num -= value;
        }
      }
    }
  
    return converted;
  }


  console.log(convertArabicToRoman(1));
  console.log(convertArabicToRoman(2));
  console.log(convertArabicToRoman(3));
  console.log(convertArabicToRoman(4));
  console.log(convertArabicToRoman(5));
  console.log(convertArabicToRoman(6));
  console.log(convertArabicToRoman(7));
  console.log(convertArabicToRoman(8));
  console.log(convertArabicToRoman(9));
  console.log(convertArabicToRoman(10));