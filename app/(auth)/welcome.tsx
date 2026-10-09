import { Href, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  BannerCard,
  DotPagination,
  FooterLink,
  HeadlineBlock,
  OnboardingLayout,
  PillTag,
  PrimaryButton,
  StepBadge,
} from "@/src/components/auth/onboarding-ui";

export default function WelcomeScreen() {
  const accountTypeRoute = "/account-type" as Href;
  const loginRoute = "/login" as Href;
  const bannerImages = [
    require("@/assets/images/banner-01.jpg"),
    require("@/assets/images/banner-02.jpg"),
    require("@/assets/images/banner-03.jpg"),
  ] as const;
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [bannerWidth, setBannerWidth] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!bannerWidth) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveBannerIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % bannerImages.length;

        bannerScrollRef.current?.scrollTo({
          x: nextIndex * bannerWidth,
          animated: true,
        });

        return nextIndex;
      });
    }, 3200);

    return () => clearInterval(intervalId);
  }, [bannerImages.length, bannerWidth]);

  return (
    <OnboardingLayout>
      <StepBadge current={1} total={2} />

      <View
        onLayout={(event) => setBannerWidth(event.nativeEvent.layout.width)}
        style={styles.bannerViewport}
      >
        <ScrollView
          horizontal
          onMomentumScrollEnd={(event) => {
            if (!bannerWidth) {
              return;
            }

            const nextIndex = Math.round(event.nativeEvent.contentOffset.x / bannerWidth);
            setActiveBannerIndex(nextIndex);
          }}
          pagingEnabled
          ref={bannerScrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.bannerScroll}
        >
          {bannerImages.map((imageSource, index) => (
            <View
              key={index}
              style={[
                styles.bannerSlide,
                bannerWidth ? { width: bannerWidth } : null,
              ]}
            >
              <BannerCard source={imageSource} />
            </View>
          ))}
        </ScrollView>
      </View>

      <DotPagination activeIndex={activeBannerIndex} total={bannerImages.length} />

      <HeadlineBlock />

      <View style={styles.tagGroup}>
        <PillTag label="Giao nhanh 2h" tone="green" />
        <PillTag label="Cam kết tươi 3 ngày" tone="pink" />
        <PillTag label="Thiệp viết tay miễn phí" tone="light" />
      </View>

      <View style={styles.footerSection}>
        <PrimaryButton
          label="Bắt đầu khám phá"
          onPress={() => router.push(accountTypeRoute)}
        />

        <FooterLink
          actionLabel="Đăng nhập ngay"
          label="Đã có tài khoản?"
          onPress={() => router.push(loginRoute)}
        />
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  bannerViewport: {
    marginTop: 2,
  },
  bannerScroll: {
    overflow: "visible",
  },
  bannerSlide: {
    flex: 1,
  },
  tagGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 28,
  },
  footerSection: {
    gap: 18,
  },
});
