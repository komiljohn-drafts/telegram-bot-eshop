import { useNavigate } from "react-router-dom";
import cls from "./styles.module.scss";

export default function MainLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className={cls.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="103"
          height="24"
          viewBox="0 0 103 24"
          fill="none"
          onClick={() => navigate("/")}
        >
          <path
            d="M29.1476 23.5208C21.1505 21.4554 19.6843 10.0604 23.826 4.24119C26.3864 0.645319 31.2318 -0.743263 35.451 0.380447C39.4991 1.45867 42.2548 4.5141 43.0976 8.62901C44.9812 17.8381 39.1513 26.1027 29.1476 23.5208ZM31.5582 4.48199C26.9135 5.18565 26.1002 10.55 26.8547 14.5258C27.5048 17.9371 30.076 20.1952 33.7093 19.4701C38.3192 18.5498 38.9479 13.0944 38.1453 9.36745C37.4229 5.99899 35.0551 3.95224 31.5582 4.48199Z"
            fill="#131814"
          />
          <path
            d="M13.7019 11.3312C13.6784 11.3397 13.6585 11.3558 13.6452 11.3769C13.6318 11.398 13.626 11.423 13.6284 11.4479C13.6309 11.4727 13.6415 11.496 13.6587 11.5141C13.6759 11.5323 13.6986 11.5441 13.7233 11.5479C16.5299 11.9091 18.4134 13.7338 18.7292 16.5083C19.2669 21.2198 15.3099 23.5743 11.1468 23.6385C7.72929 23.6884 4.30911 23.6964 0.886256 23.6626C0.853615 23.6626 0.822311 23.6496 0.79923 23.6265C0.776149 23.6034 0.763184 23.5721 0.763184 23.5395V0.468654C0.763184 0.381254 0.806883 0.336663 0.894282 0.334879C3.98002 0.324177 7.05685 0.327739 10.1248 0.345575C14.2209 0.369655 18.1459 2.04987 17.7981 6.86577C17.6054 9.50917 15.9654 10.5419 13.7019 11.3312ZM5.7075 4.40163L5.71821 10.0041C5.71821 10.0154 5.72042 10.0265 5.72472 10.0369C5.72903 10.0473 5.73533 10.0567 5.74328 10.0647C5.75123 10.0726 5.76067 10.0789 5.77106 10.0832C5.78145 10.0875 5.79258 10.0897 5.80382 10.0897L9.56825 10.0844C10.4458 10.0827 11.2869 9.79094 11.9065 9.27316C12.5262 8.75537 12.8736 8.054 12.8725 7.32328V7.06108C12.8719 6.69911 12.7857 6.34084 12.6188 6.0067C12.4519 5.67257 12.2076 5.36913 11.8997 5.11372C11.5919 4.85831 11.2266 4.65593 10.8247 4.51814C10.4229 4.38035 9.99226 4.30985 9.55755 4.31067L5.79312 4.31602C5.77042 4.31602 5.74864 4.32504 5.73258 4.3411C5.71653 4.35715 5.7075 4.37893 5.7075 4.40163ZM5.70483 13.5411L5.71553 19.5664C5.71553 19.5744 5.71712 19.5824 5.72022 19.5899C5.72331 19.5974 5.72784 19.6042 5.73355 19.6099C5.73927 19.6156 5.74605 19.6201 5.75352 19.6232C5.76098 19.6263 5.76899 19.6279 5.77707 19.6279L10.304 19.6199C10.7473 19.6191 11.186 19.542 11.5952 19.3931C12.0044 19.2442 12.3761 19.0264 12.6889 18.7521C13.0017 18.4778 13.2496 18.1524 13.4183 17.7945C13.5871 17.4365 13.6735 17.0531 13.6725 16.6661V16.4093C13.6705 15.6284 13.3134 14.8802 12.6797 14.3294C12.0461 13.7785 11.1877 13.47 10.2933 13.4716L5.76637 13.4796C5.75005 13.4796 5.7344 13.4861 5.72285 13.4976C5.71131 13.5092 5.70483 13.5248 5.70483 13.5411Z"
            fill="#131814"
          />
          <path
            d="M45.1765 4.25188V0.431268C45.1765 0.405013 45.1869 0.379834 45.2054 0.361269C45.224 0.342704 45.2492 0.332275 45.2754 0.332275H64.2742C64.3004 0.332275 64.3256 0.342704 64.3442 0.361269C64.3627 0.379834 64.3732 0.405013 64.3732 0.431268V4.24653C64.3732 4.25953 64.3706 4.27241 64.3656 4.28442C64.3606 4.29643 64.3534 4.30734 64.3442 4.31653C64.335 4.32572 64.3241 4.33301 64.3121 4.33799C64.3 4.34296 64.2872 4.34552 64.2742 4.34552H57.2804C57.2542 4.34552 57.229 4.35595 57.2104 4.37452C57.1918 4.39308 57.1814 4.41826 57.1814 4.44452L57.1627 23.577C57.1627 23.6033 57.1523 23.6284 57.1337 23.647C57.1151 23.6656 57.0899 23.676 57.0637 23.676H52.4271C52.4008 23.676 52.3756 23.6656 52.3571 23.647C52.3385 23.6284 52.3281 23.6033 52.3281 23.577L52.3174 4.44184C52.3174 4.41558 52.3069 4.3904 52.2884 4.37184C52.2698 4.35327 52.2446 4.34285 52.2184 4.34285L45.2754 4.35087C45.2492 4.35087 45.224 4.34044 45.2054 4.32188C45.1869 4.30331 45.1765 4.27813 45.1765 4.25188Z"
            fill="#131814"
          />
          <path
            d="M72.282 9.11073C72.6485 8.38032 73.0525 7.66061 73.6625 7.14959C76.1989 5.02525 80.8248 5.72355 81.8576 9.18832C81.8615 9.19977 81.8686 9.20988 81.878 9.21747C81.8875 9.22506 81.8988 9.22984 81.9109 9.23124C81.9229 9.23264 81.9351 9.2306 81.946 9.22537C81.9569 9.22015 81.9662 9.21194 81.9726 9.2017C83.3532 6.8312 85.2831 5.75298 87.7624 5.96702C91.7863 6.31483 92.9208 9.25788 92.8485 12.8645C92.7763 16.4202 92.8646 19.9759 92.8753 23.5317C92.8753 23.628 92.828 23.6761 92.7335 23.6761H88.1236C88.0344 23.6761 87.9898 23.6316 87.9898 23.5424C87.9827 19.8841 87.9755 16.2276 87.9684 12.5728C87.9631 9.04384 82.5478 9.04652 82.5291 12.7735C82.5095 16.364 82.4979 19.9545 82.4943 23.5451C82.4943 23.5798 82.4805 23.6132 82.4559 23.6377C82.4314 23.6623 82.398 23.6761 82.3632 23.6761H77.8871C77.7979 23.6761 77.7534 23.6316 77.7534 23.5424C77.7462 20.0874 77.7462 16.6342 77.7534 13.1828C77.7641 8.49537 72.2632 9.26591 72.2659 13.0437C72.2695 16.5397 72.2686 20.0384 72.2632 23.5397C72.2632 23.6307 72.2186 23.6761 72.1295 23.6761H67.5169C67.4814 23.6761 67.4474 23.6621 67.4223 23.637C67.3972 23.6119 67.3831 23.5779 67.3831 23.5424V6.2854C67.3831 6.19622 67.4277 6.15163 67.5169 6.15163H71.9288C71.9482 6.15162 71.9675 6.15552 71.9853 6.16312C72.0032 6.17071 72.0194 6.18183 72.0329 6.19582C72.0464 6.20981 72.0569 6.22637 72.0638 6.24452C72.0708 6.26267 72.074 6.28204 72.0733 6.30146L71.9796 9.03314C71.9791 9.06917 71.9907 9.10434 72.0126 9.13297C72.0345 9.16161 72.0653 9.18205 72.1002 9.19101C72.1351 9.19997 72.172 9.19691 72.205 9.18235C72.238 9.16779 72.2651 9.14257 72.282 9.11073Z"
            fill="#1A5D1A"
          />
          <path
            d="M99.5158 23.9757C101.019 23.9757 102.237 22.7574 102.237 21.2547C102.237 19.7519 101.019 18.5337 99.5158 18.5337C98.0131 18.5337 96.7949 19.7519 96.7949 21.2547C96.7949 22.7574 98.0131 23.9757 99.5158 23.9757Z"
            fill="#1A5D1A"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}
