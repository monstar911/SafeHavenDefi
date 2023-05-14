import styled from "styled-components";
import { Link } from "@mui/material";
import { Flex } from "@pancakeswap/uikit";

const SocialRow = styled(Flex)`
  justify-content: space-evenly;
  padding: 1.3rem;

  a {
    &:hover {
      transform: scale(1.1);
    }

    img {
      height: 20px;
      width: 20px;
    }
  }
`;

export default function Social({ mobileOpen, handleDrawerToggle }) {
  return (
    <SocialRow
      flexDirection={mobileOpen ? "row" : "column"}
      alignItems="center"
    >
      <Link
        mb="4px"
        href="https://t.me/SafeHavendefi/"
        onClick={handleDrawerToggle}
        target="_blank"
      >
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          data-bbox="-134 -424 1290.8 764.1"
          viewBox="0 0 64 56"
          data-type="ugc"
          role="presentation"
          aria-hidden="true"
          aria-labelledby="svgcid-ex85nvhf8jfi"
        >
          <g>
            <linearGradient
              xmlns="http://www.w3.org/2000/svg"
              y2="28"
              x2="63.999"
              y1="28"
              x1="0"
              gradientUnits="userSpaceOnUse"
              id="svgcid--ybyf4fd9m3is"
            >
              <stop offset="0" stopColor="#66cc33" />
              <stop offset="1" stopColor="#3399cc" />
            </linearGradient>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M29.1 35.9h.6l-.4.4c0-.2-.1-.3-.2-.4zM63.7 9.3l-8.4 40.6c-.9 4.5-4 6.1-6.5 6.1-1.3 0-2.7-.4-4.1-1.2l-.2-.1-.2-.2-17.6-13.2-.6 7.7c-.3 1.8-2 3.1-3.9 3-1.4-.1-2.6-1.1-3.1-2.3l-2.9-8.8c-.1-.3-.2-.6-.2-.9 0-1.1.9-2 2-2 .9 0 1.6.6 1.9 1.3l2.4 7.2.4-4.1c.2-2.6 2.5-4.6 5.2-4.4.9.1 1.7.4 2.3.8l16.5 12.5c.8.4 1.5.7 2.1.7 1.3 0 2.2-1 2.6-2.9l8.4-40.7c.7-2.8-.6-4.4-2.2-4.4-.4 0-.9.1-1.3.3L6.6 23.9C3.2 25.3 3.2 27.2 6 28l8.2 2.6c.6.2 1.2.1 1.7-.2l21.9-13.8c1.9-1.1 4.3-.6 5.5 1.3 1 1.6.8 3.6-.5 4.9L31.4 34.2c-.4.3-.8.6-1.4.6-1.1 0-2-.9-2-2 0-.5.2-1 .6-1.4L39.9 20 18 33.9c-1.6 1-3.4 1.1-5 .6l-8.2-2.6C.5 30.5 0 27.4 0 26.5c-.1-1.6.5-4.4 5.1-6.3L54.7.6c.9-.4 1.9-.6 2.9-.6 2 0 3.8.9 5 2.4 1.3 1.8 1.7 4.2 1.1 6.9zM30 46c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
              fill="url(#svgcid--ybyf4fd9m3is)"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </Link>

      <Link
        mb="4px"
        href="https://twitter.com/SafehavenDeFi/"
        onClick={handleDrawerToggle}
        target="_blank"
      >
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          data-bbox="-134 -424 1290.8 764.1"
          viewBox="0 0 64 56"
          data-type="ugc"
          role="presentation"
          aria-hidden="true"
          aria-labelledby="svgcid-ex85nvhf8jfi"
        >
          <g>
            <linearGradient
              xmlns="http://www.w3.org/2000/svg"
              y2="28.002"
              x2="64"
              y1="28.002"
              x1="0"
              gradientUnits="userSpaceOnUse"
              id="svgcid-lxqpfr-39phsy"
            >
              <stop offset="0" stopColor="#66cc33" />
              <stop offset="1" stopColor="#3399cc" />
            </linearGradient>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M64 9.5c0 .9-.3 1.7-.7 2.4-1.3 1.9-3 3.3-4.7 4.7-.3.3-.5.7-.5 1.1-.2 8.7-3.4 18.7-9.1 25.2C42.1 50.7 32.8 56 22 56c-1.1 0-2-.9-2-2s.9-2 2-2c19.8 0 30.6-17.3 31.9-32.1.1-.2.1-.5.1-.9v-.4c.1-1.7.9-3.3 2.1-4.4l.1-.1C57.6 12.7 59 11 60 9.5c-1.5.7-3 1.2-4.6 1.5-.3 0-.5-.2-.5-.5 0-.1.1-.3.1-.4 1.6-1.4 2.8-3.2 3.4-5.2-1 .6-2.1 1.2-3.3 1.6-.7.3-1.5.5-2.4.5-1.3 0-2.6-.4-3.6-1.1C47.4 4.7 45.3 4 43 4h-.2c-5.8 0-9.9 3.7-10.6 9.2-.4 2.4-2.5 4.1-4.9 4.1-.3 0-.6 0-.8-.1-6.6-1.2-12.6-4.1-17-8.8-.7-.4-1.6-.4-2.2.2-.2.1-.3.3-.3.5 0 .1 0 .1-.1.1-.5 1.2-.9 2.5-.9 3.8 0 2.8 1.1 5.3 2.8 7.3.1.2.2.3.2.5 0 .6-.4 1-1 1-.1 0-.3 0-.4-.1h-.1c-.1-.1-.3-.1-.4-.1-.6 0-1 .4-1 1 .5 3.5 2.7 6.7 5.6 8.5.3.2.5.5.5.8 0 .6-.4 1-1 1h-.3c-.2 0-.4.2-.4.5 0 .1 0 .2.1.2.8 2.1 2.2 3.8 4 5.1.1.1.3.2.4.3 1.4 1.4 1.4 3.6 0 5-.4.4-.9.7-1.4.9-.1 0-.1 0-.1.1-2 .6-4.2 1-6.4 1H5.8c-.3 0-.5.2-.5.5 0 .2.1.3.2.4.8.5 1.5.9 2.3 1.3.7.3 1.2 1 1.2 1.8 0 1.1-.9 1.9-1.9 1.9-.4 0-.8-.1-1.1-.4-1.4-.7-2.8-1.5-4.1-2.4-1.6-1-2.2-3-1.6-4.8.5-1.5 2-2.3 3.7-2.3.7.1 2.2 0 3 0 1.5 0 2.8-.3 4.2-.7C9 39.4 7.3 37 6.4 34.1c-.2-.7-.2-1.5-.1-2.2C3.8 29.1 2 25.1 2 21c0-1 .7-1.8 1.3-2.6C2.7 16.7 2 14.9 2 13c0-2.8 1.1-5.5 2.4-7.9C5.1 4 6.7 3.1 8 3c1.2 0 2.3.7 3 1.6 3.8 4.7 9.6 7.2 15.4 8.6h.4c.9 0 1.6-.6 1.9-1.3C30.2 5.1 35.5 0 42.8 0c3.1 0 6.1.9 8.6 2.6.3.2.8.4 1.2.4.3 0 .6-.1.9-.2.1 0 .1 0 .2-.1.9-.4 1.8-.8 2.6-1.3.7-.4 1.4-.4 2.1-.4.9 0 1.8.1 2.5.7 1.3 1 1.8 2.8 1.3 4.4 1.1.8 1.8 2 1.8 3.4zM4 42c-.2 0 .2 0 0 0zM8 3c-.1 0 .1 0 0 0zm7 48c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
              fill="url(#svgcid-lxqpfr-39phsy)"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </Link>

      <Link
        mb="4px"
        onClick={handleDrawerToggle}
        href="https://www.reddit.com/r/SafeHavenDefi/"
        target="_blank"
      >
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          data-bbox="-134 -424 1290.8 764.1"
          viewBox="0 0 64 56"
          data-type="ugc"
          role="presentation"
          aria-hidden="true"
          aria-labelledby="svgcid-ex85nvhf8jfi"
        >
          <g>
            <linearGradient
              xmlns="http://www.w3.org/2000/svg"
              y2="28"
              x2="64"
              y1="28"
              x1="0"
              gradientUnits="userSpaceOnUse"
              id="svgcid--hpaqhy-jicpid"
            >
              <stop offset="0" stopColor="#66cc33" />
              <stop offset="1" stopColor="#3399cc" />
            </linearGradient>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M39 16.7c.2 0 .4 0 .6.1 4.5.9 8.4 2.6 11.7 4.8 1.3-1 2.9-1.5 4.7-1.5 4.4 0 8 3.6 8 8 0 3-1.6 5.6-4.1 7 0 .3.1.7.1 1 0 11-12.5 20-28 20C16.5 56 4 47 4 36c0-.3 0-.7.1-1C1.6 33.6 0 31 0 28c0-4.4 3.6-8 8-8 1.8 0 3.4.6 4.7 1.5 4.1-2.8 9.4-4.7 15.2-5.3h.1c1.5-.1 2.9-1.2 3.4-2.7l2.2-8.1c1-2.8 3.9-4.5 6.9-3.8l3.3.9C46.2 3.1 48 5.3 48 8c0 2.2 1.8 4 4 4s4-1.8 4-4c0-.7-.2-1.4-.6-2-.2-.3-.3-.6-.3-1 0-1.1.9-2 2-2 .7 0 1.4.4 1.7 1 .1 0 .2.1.2.2.6 1.1 1 2.4 1 3.8 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-.7-.5-1.4-1.1-1.6l-3.2-.9c-1-.2-2 .3-2.3 1.3l-2.1 7.8c-1 3.1-3.6 5.2-6.6 5.5C17 21.3 8 27.9 8 36c0 8.8 10.7 16 24 16s24-7.2 24-16c0-7.3-7.3-13.4-17.3-15.4-.9-.2-1.7-1-1.7-2s.9-1.9 2-1.9zM9.4 24.3c-.5-.2-.9-.3-1.4-.3-2.2 0-4 1.8-4 4 0 1 .4 2 1 2.7.9-2.4 2.4-4.5 4.4-6.4zM59 30.7c.6-.7 1-1.6 1-2.7 0-2.2-1.8-4-4-4-.5 0-.9.1-1.4.3 2 1.9 3.5 4 4.4 6.4zM38.1 32c0-2.1 1.7-3.9 3.9-3.9 2.1 0 3.9 1.7 3.9 3.9s-1.7 3.9-3.9 3.9c-2.1 0-3.9-1.8-3.9-3.9zM22 35.9c-2.1 0-3.9-1.7-3.9-3.9s1.7-3.9 3.9-3.9c2.1 0 3.9 1.7 3.9 3.9s-1.8 3.9-3.9 3.9zm17.4 5.9c.4-.5 1-.8 1.6-.8 1.1 0 2 .9 2 2v.4C42.5 46 37.8 48 32 48c-5.6 0-10.2-1.9-10.9-4.4-.1-.2-.1-.4-.1-.6 0-1.1.9-2 2-2 .7 0 1.4.4 1.7 1 1 1.2 3.9 2 7.3 2 3.5 0 6.5-.9 7.4-2.2zM52 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
              fill="url(#svgcid--hpaqhy-jicpid)"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </Link>

      <Link
        mb="4px"
        onClick={handleDrawerToggle}
        href="https://www.instagram.com/safehavendefiofficial/"
        target="_blank"
      >
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          data-bbox="-134 -424 1290.8 764.1"
          viewBox="0 0 64 56"
          data-type="ugc"
          role="presentation"
          aria-hidden="true"
          aria-labelledby="svgcid-ex85nvhf8jfi"
        >
          <g>
            <linearGradient
              xmlns="http://www.w3.org/2000/svg"
              y2="32"
              x2="64"
              y1="32"
              x1="0"
              gradientUnits="userSpaceOnUse"
              id="svgcid--byofn0-11i46b"
            >
              <stop offset="0" stopColor="#66cc33" />
              <stop offset="1" stopColor="#3399cc" />
            </linearGradient>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M48 10v4c0 1.1.9 2 2 2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-5c-2.8 0-5-2.2-5-5v-5c0-1.1.9-2 2-2s2 .9 2 2zM16 34c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm16 14c-4.3 0-8.3-1.7-11.2-4.5-.5-.4-.7-.9-.7-1.6 0-1.1.9-2 2-2 .5 0 1.1.2 1.4.6 2.2 2.2 5.2 3.5 8.5 3.5 6.1 0 11.1-4.5 11.9-10.3.2-1.1 1.2-1.8 2.3-1.7 1.1.2 1.8 1.2 1.7 2.2C46.7 42 40.1 48 32 48zm30-12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM52 64H12C5.4 64 0 58.6 0 52V32c0-4.4 3.6-8 8-8h8c1.3 0 2.5-.6 3.2-1.6C22.1 18.5 26.8 16 32 16c5.2 0 9.9 2.5 12.8 6.4.7 1 1.9 1.6 3.2 1.6h8c2.2 0 4-1.8 4-4v-8c0-4.4-3.6-8-8-8H12c-4.4 0-8 3.6-8 8v6c0 1.1-.9 2-2 2s-2-.9-2-2v-6C0 5.4 5.4 0 12 0h40c6.6 0 12 5.4 12 12v8c0 4.4-3.6 8-8 8h-8c-2.6 0-4.9-1.3-6.4-3.2-2.2-2.9-5.7-4.8-9.6-4.8s-7.4 1.9-9.6 4.8C20.9 26.7 18.6 28 16 28H8c-2.2 0-4 1.8-4 4v20c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8V42c0-1.1.9-2 2-2s2 .9 2 2v10c0 6.6-5.4 12-12 12z"
              fill="url(#svgcid--byofn0-11i46b)"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </Link>
    </SocialRow>
  );
}
