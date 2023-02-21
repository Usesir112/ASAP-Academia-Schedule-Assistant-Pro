export function svgSelector(text: string) {
  let svgTag: string = `<svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> `;
  switch (text) {
    case "ตาราง":
      svgTag += `<path d = "M0 7.07967V3.09609C0 2.36577 0.257456 1.74034 
        0.772368 1.21982C1.28816 0.700187 1.90789 0.440369 2.63158
        0.440369H22.3684C23.0921 0.440369 23.7118 0.700187 24.2276
        1.21982C24.7425 1.74034 25 2.36577 25 3.09609V7.07967H0ZM6.57895
        9.7354V24.3419H2.63158C1.90789 24.3419 1.28816 24.082 0.772368
        23.5624C0.257456 23.0419 0 22.4165 0 21.6861V9.7354H6.57895ZM18.4211
        9.7354H25V21.6861C25 22.4165 24.7425 23.0419 24.2276 23.5624C23.7118
        24.082 23.0921 24.3419 22.3684 24.3419H18.4211V9.7354ZM15.7895
        9.7354V24.3419H9.21053V9.7354H15.7895Z" fill = "#A7AABD" />`;
      break;

    case "วิชา":
      svgTag += `<path d="M15.2778 10.2426H22.9167L15.2778 2.53363V10.2426ZM2.77778 
      0.431183H16.6667L25 8.84097V22.8573C25 23.6007 24.7073 24.3138 24.1864
      24.8395C23.6655 25.3652 22.9589 25.6605 22.2222 25.6605H2.77778C2.04107 25.6605
      1.33453 25.3652 0.813592 24.8395C0.292658 24.3138 0 23.6007 0 22.8573V3.23444C0
      1.67863 1.23611 0.431183 2.77778 0.431183ZM2.77778 13.0459V15.8491H22.2222V13.0459H2.77778ZM2.77778
      18.6524V21.4556H15.2778V18.6524H2.77778Z" fill="#A7AABD"/>`;
      break;

    case "ผู้ใช้":
      svgTag += `<path d="M10.9375 19.3807C10.9375 19.3807 9.375 19.3807 9.375 17.8039C9.375 
      16.2271 10.9375 11.4966 17.1875 11.4966C23.4375 11.4966 25 16.2271 25 17.8039C25 19.3807 23.4375 
      19.3807 23.4375 19.3807H10.9375ZM17.1875 9.91972C18.4307 9.91972 19.623 9.42133 20.5021 
      8.53419C21.3811 7.64704 21.875 6.44382 21.875 5.18921C21.875 3.93461 21.3811 2.73138 20.5021 
      1.84424C19.623 0.957101 18.4307 0.45871 17.1875 0.45871C15.9443 0.45871 14.752 0.957101 13.8729 
      1.84424C12.9939 2.73138 12.5 3.93461 12.5 5.18921C12.5 6.44382 12.9939 7.64704 13.8729 8.53419C14.752 
      9.42133 15.9443 9.91972 17.1875 9.91972ZM8.15 19.3807C7.91837 18.8885 7.80285 18.3488 7.8125 
      17.8039C7.8125 15.6673 8.875 13.4676 10.8375 11.9381C9.85795 11.6335 8.83742 11.4845 7.8125 
      11.4966C1.5625 11.4966 0 16.2271 0 17.8039C0 19.3807 1.5625 19.3807 1.5625 19.3807H8.15ZM7.03125 
      9.91972C8.06725 9.91972 9.06082 9.50439 9.79339 8.76511C10.5259 8.02582 10.9375 7.02314 10.9375 
      5.97763C10.9375 4.93213 10.5259 3.92944 9.79339 3.19016C9.06082 2.45087 8.06725 2.03554 7.03125 
      2.03554C5.99525 2.03554 5.00168 2.45087 4.26911 3.19016C3.53655 3.92944 3.125 4.93213 3.125 
      5.97763C3.125 7.02314 3.53655 8.02582 4.26911 8.76511C5.00168 9.50439 5.99525 9.91972 7.03125 
      9.91972Z" fill="#A7AABD"/>`;
      break;

    case "ห้องเรียน":
      svgTag += `<path d="M9.72155 0.471176C9.81266 0.396884 9.91907 0.344086 10.033 0.316646C10.1469 
          0.289205 10.2655 0.287816 10.38 0.31258L21.3808 2.68993C21.5563 2.72835 21.7134 2.82626 21.8261 
          2.96736C21.9388 3.10847 22.0001 3.28426 22 3.46547V22.497C22.0001 22.6784 21.9385 22.8544 21.8255 
          22.9955C21.7125 23.1366 21.555 23.2344 21.3792 23.2725L10.3785 25.6514C10.2642 25.676 10.146 
          25.6745 10.0324 25.6471C9.91883 25.6197 9.81271 25.5671 9.7218 25.4931C9.63088 25.4191 9.55745 
          25.3256 9.50684 25.2194C9.45623 25.1132 9.42973 24.9969 9.42924 24.8791V1.0897C9.42927 0.971372 
          9.45553 0.854551 9.50611 0.747799C9.55669 0.641047 9.6303 0.547072 9.72155 0.472762V0.471176ZM14.9328 
          12.9812C14.9328 12.6658 14.8086 12.3632 14.5876 12.1401C14.3665 11.9171 14.0667 11.7917 13.7541 11.7917C13.4415 
          11.7917 13.1417 11.9171 12.9207 12.1401C12.6996 12.3632 12.5755 12.6658 12.5755 12.9812C12.5755 13.2967 12.6996 
          13.5992 12.9207 13.8223C13.1417 14.0454 13.4415 14.1707 13.7541 14.1707C14.0667 14.1707 14.3665 14.0454 14.5876 
          13.8223C14.8086 13.5992 14.9328 13.2967 14.9328 12.9812ZM7.86085 1.88268H0.78577C0.577371 1.88268 0.377507 1.96622 
          0.230147 2.11494C0.0827864 2.26365 0 2.46535 0 2.67566V23.2852C0 23.4955 0.0827864 23.6972 0.230147 23.8459C0.377507 
          23.9946 0.577371 24.0782 0.78577 24.0782H7.86085V1.88268Z" fill="#A7AABD"/>`;
      break;
  }
  svgTag += `</svg>`;
  return svgTag;
}