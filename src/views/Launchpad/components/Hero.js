import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Heading, Text, Flex, Box, Link, Skeleton } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ConnectWalletButton from "../../../components/ConnectWalletButton";
import PageHeader from "../../../components/PageHeader";


const StyledTitle = styled(Heading)`
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 22px;
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none !important;
  word-break: break-all;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 22px;
  }
`;

const CopyButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
`;

const LinkText = styled(Text)`
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  word-break: break-all;
`;

const TimeCountText = styled(Heading)`
  white-space: nowrap;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`;

const Hero = () => {
  const pinksaleStartTimeStamp = 1652900400;
  const privatesaleStartTimeStamp = 1652209200;
  const privatesaleEndTimeStamp = 1652814000;
  const pancakeswapLaunchTimeStamp = 1652990400;
  const { account } = useWeb3React();
  const app = useSelector((state) => state.app);
  console.log("Haven token: ", app.userBalanceOfHAVEN);
  console.log("SLT token: ", app.userBalanceOfSLT);
  const [copySuccess, setCopySuccess] = useState(false);
  const link = `${window.location.origin}/#/launchpad?ref=${btoa(account)}`;

  const [currentTimeStamp, setCurrentTimeStamp] = useState(
    Math.floor(new Date().getTime() / 1000)
  );
  useEffect(() => {
    let timeInterval;
    const fetchBlockNumber = async () => {
      timeInterval = setInterval(async () => {
        setCurrentTimeStamp(Math.floor(new Date().getTime() / 1000));
      }, 1000);
    };
    fetchBlockNumber();
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <PageHeader>
      <Heading
        as="h1"
        scale="xxl"
        color="text"
        mb="50px"
        style={{ userSelect: "none" }}
      >
        SafePad
      </Heading>

      <Heading scale="lg" color="text" mt="50px" mb="32px" style={{ userSelect: "none" }}>
        Get into SLT private sale by holding atleast 1,000 HAVEN TOKENS and
        committing BUSD.
      </Heading>
      {privatesaleStartTimeStamp ? (
        <Flex>
          <TimeCountText
            color={
              privatesaleStartTimeStamp - currentTimeStamp > 0
                ? "#ffbc00"
                : privatesaleEndTimeStamp - currentTimeStamp > 0
                ? "green"
                : "red"
            }
            mr="16px"
          >
            {privatesaleStartTimeStamp - currentTimeStamp > 0
              ? "Private Sale in:"
              : privatesaleEndTimeStamp - currentTimeStamp > 0
              ? "Private Sale is live:"
              : "Private Sale is over"}
          </TimeCountText>
          {privatesaleStartTimeStamp - currentTimeStamp > 0 ? (
            <TimeCountText color="text">
              {Math.floor(
                (privatesaleStartTimeStamp - currentTimeStamp) / 86400
              ) > 0 &&
                Math.floor(
                  (privatesaleStartTimeStamp - currentTimeStamp) / 86400
                )}
              {Math.floor(
                (privatesaleStartTimeStamp - currentTimeStamp) / 86400
              ) > 0 && " d: "}
              {Math.floor(
                ((privatesaleStartTimeStamp - currentTimeStamp) % 86400) / 3600
              )}
              {" h: "}
              {Math.floor(
                ((privatesaleStartTimeStamp - currentTimeStamp) % 3600) / 60
              )}
              {" m: "}
              {Math.floor(
                ((privatesaleStartTimeStamp - currentTimeStamp) % 3600) % 60
              )}
              {" s"}
            </TimeCountText>
          ) : privatesaleEndTimeStamp - currentTimeStamp > 0 ? (
            <TimeCountText color="text">
              {Math.floor(
                (privatesaleEndTimeStamp - currentTimeStamp) / 86400
              ) > 0 &&
                Math.floor(
                  (privatesaleEndTimeStamp - currentTimeStamp) / 86400
                )}
              {Math.floor(
                (privatesaleEndTimeStamp - currentTimeStamp) / 86400
              ) > 0 && " d: "}
              {Math.floor(
                ((privatesaleEndTimeStamp - currentTimeStamp) % 86400) / 3600
              )}
              {" h: "}
              {Math.floor(
                ((privatesaleEndTimeStamp - currentTimeStamp) % 3600) / 60
              )}
              {" m: "}
              {Math.floor(
                ((privatesaleEndTimeStamp - currentTimeStamp) % 3600) % 60
              )}
              {" s"}
            </TimeCountText>
          ) : null}
        </Flex>
      ) : (
        <Skeleton width={200} mb={20} />
      )}
      {pinksaleStartTimeStamp ? (
        <Flex>
          <TimeCountText
            color={
              pinksaleStartTimeStamp - currentTimeStamp > 0
                ? "#ffbc00"
                : "green"
            }
            mr="16px"
          >
            {pinksaleStartTimeStamp - currentTimeStamp > 0
              ? "Pinksale Presale in:"
              : "Pinksale Presale is live:"}
          </TimeCountText>
          {pinksaleStartTimeStamp - currentTimeStamp > 0 ? (
            <TimeCountText color="text">
              {Math.floor((pinksaleStartTimeStamp - currentTimeStamp) / 86400) >
                0 &&
                Math.floor((pinksaleStartTimeStamp - currentTimeStamp) / 86400)}
              {Math.floor((pinksaleStartTimeStamp - currentTimeStamp) / 86400) >
                0 && " d: "}
              {Math.floor(
                ((pinksaleStartTimeStamp - currentTimeStamp) % 86400) / 3600
              )}
              {" h: "}
              {Math.floor(
                ((pinksaleStartTimeStamp - currentTimeStamp) % 3600) / 60
              )}
              {" m: "}
              {Math.floor(
                ((pinksaleStartTimeStamp - currentTimeStamp) % 3600) % 60
              )}
              {" s"}
            </TimeCountText>
          ) : null}
        </Flex>
      ) : (
        <Skeleton width={200} />
      )}
      {pancakeswapLaunchTimeStamp ? (
        <Flex>
          <TimeCountText
            color={
              pancakeswapLaunchTimeStamp - currentTimeStamp > 0
                ? "#ffbc00"
                : "green"
            }
            mr="16px"
          >
            {pancakeswapLaunchTimeStamp - currentTimeStamp > 0
              ? "PancakeSwap Launch in:"
              : "Live on pancakeswap:"}
          </TimeCountText>
          {pancakeswapLaunchTimeStamp - currentTimeStamp > 0 ? (
            <TimeCountText color="text">
              {Math.floor(
                (pancakeswapLaunchTimeStamp - currentTimeStamp) / 86400
              ) > 0 &&
                Math.floor(
                  (pancakeswapLaunchTimeStamp - currentTimeStamp) / 86400
                )}
              {Math.floor(
                (pancakeswapLaunchTimeStamp - currentTimeStamp) / 86400
              ) > 0 && " d: "}
              {Math.floor(
                ((pancakeswapLaunchTimeStamp - currentTimeStamp) % 86400) / 3600
              )}
              {" h: "}
              {Math.floor(
                ((pancakeswapLaunchTimeStamp - currentTimeStamp) % 3600) / 60
              )}
              {" m: "}
              {Math.floor(
                ((pancakeswapLaunchTimeStamp - currentTimeStamp) % 3600) % 60
              )}
              {" s"}
            </TimeCountText>
          ) : null}
        </Flex>
      ) : (
        <Skeleton width={200} />
      )}
      <Flex>
        <StyledTitle color="text" mr="16px">
          Contract
        </StyledTitle>
        <StyledLink
          color="#ffbc00"
          href="https://bscscan.com/address/0xAaE8bc1BC5527217393228af82b2AD4fAecED99F/"
          target="_blank"
        >
          0xAaE8bc1BC5527217393228af82b2AD4fAecED99F
        </StyledLink>
      </Flex>
      <Flex>
        <StyledTitle color="text" mr="16px">
          Project Site
        </StyledTitle>
        <StyledLink
          color="#ffbc00"
          href="https://www.safehavendefi.com/"
          target="_blank"
        >
          https://www.safehavendefi.com/
        </StyledLink>
      </Flex>
      <Flex>
        <StyledTitle color="text" mr="16px">
          Twitter
        </StyledTitle>
        <StyledLink
          color="#ffbc00"
          href="https://twitter.com/SafehavenDeFi/"
          target="_blank"
        >
          https://twitter.com/SafehavenDeFi/
        </StyledLink>
      </Flex>
      <Flex>
        <StyledTitle color="text" mr="16px">
          Telegram
        </StyledTitle>
        <StyledLink
          color="#ffbc00"
          href="https://t.me/SafeHavendefi/"
          target="_blank"
        >
          https://t.me/SafeHavendefi/
        </StyledLink>
      </Flex>

      <Box mb="24px" mt="12px">
        {account ? (
          <>
            <StyledTitle color="text" textAlign="center">
              Your referral Link to get 2% commission of your friend's final
              allocated deposit
            </StyledTitle>
            <Flex justifyContent="center" mb="16px">
              <CopyToClipboard text={link} onCopy={() => setCopySuccess(true)}>
                <CopyButton>
                  {copySuccess ? `Copied` : `Copy to clipboard`}
                </CopyButton>
              </CopyToClipboard>
            </Flex>
            <CopyToClipboard text={link} onCopy={() => setCopySuccess(true)}>
              <LinkText color="lightText" textAlign="center">
                {link}
              </LinkText>
            </CopyToClipboard>
          </>
        ) : (
          <>
            <ConnectWalletButton width="100%" />
          </>
        )}
      </Box>
      <StyledTitle color="text">
        What is the ITO “Overflow” sale method?
      </StyledTitle>
      <Text fontSize="18px" color="text">
        Basically, the more you put in, the more you will get, and you'll get
        back anything that doesn't get spent. In the “Overflow” method, it's not
        warrantied that user will get 100% of the amount they commit. The user's
        final allocation will be based on the amount of funds they put in as a
        percentage of all funds put in by other users at the time the sale ends.
        Users will receive back any unspent funds when they claim their tokens
        after the sale.
      </Text>
    </PageHeader>
  );
};

export default Hero;
