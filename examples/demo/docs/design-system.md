# Tokamak DAO v2 Design System Guide

이 문서는 Tokamak DAO v2 앱의 디자인 시스템을 정리한 종합 가이드입니다. 다른 시스템에서 참조하고 적용할 수 있도록 작성되었습니다.

---

## 목차

1. [개요](#1-개요)
2. [색상 (Colors)](#2-색상-colors)
3. [타이포그래피 (Typography)](#3-타이포그래피-typography)
4. [스페이싱 (Spacing)](#4-스페이싱-spacing)
5. [Border Radius](#5-border-radius)
6. [그림자 (Shadows)](#6-그림자-shadows)
7. [애니메이션 & 트랜지션](#7-애니메이션--트랜지션)
8. [Z-Index](#8-z-index)
9. [시맨틱 토큰 (Semantic Tokens)](#9-시맨틱-토큰-semantic-tokens)
10. [컴포넌트 토큰](#10-컴포넌트-토큰)
11. [컴포넌트 패턴](#11-컴포넌트-패턴)
12. [다크 모드 적용 방법](#12-다크-모드-적용-방법)

---

## 1. 개요

### 디자인 시스템 소개

Tokamak DAO v2 디자인 시스템은 Tally.xyz 거버넌스 플랫폼에서 영감을 받아 구축되었습니다. 일관된 UI/UX를 제공하고 개발 효율성을 높이기 위해 CSS Custom Properties(CSS 변수)를 기반으로 한 디자인 토큰 시스템을 사용합니다.

### 토큰 계층 구조

디자인 토큰은 3단계 계층으로 구성됩니다:

```
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Component Tokens (컴포넌트별 토큰)             │
│  예: --card-bg, --input-border, --modal-radius          │
├─────────────────────────────────────────────────────────┤
│  Layer 2: Semantic Tokens (의미적 토큰)                  │
│  예: --bg-primary, --text-secondary, --border-brand     │
├─────────────────────────────────────────────────────────┤
│  Layer 1: Primitive Tokens (원시 토큰)                   │
│  예: --color-primary-500, --space-4, --radius-lg        │
└─────────────────────────────────────────────────────────┘
```

1. **Primitive Tokens**: 색상 팔레트, 스페이싱 스케일, 타이포그래피 등 원시 값
2. **Semantic Tokens**: 문맥적 의미를 가진 토큰 (테마별로 다른 값 매핑)
3. **Component Tokens**: 특정 컴포넌트에서 사용하는 토큰

### 적용 방법

CSS 변수를 사용하여 스타일을 적용합니다:

```css
/* CSS에서 사용 */
.my-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

```tsx
/* Tailwind + CSS 변수 사용 */
<div className="bg-[var(--bg-primary)] text-[var(--text-primary)] p-[var(--space-4)] rounded-[var(--radius-lg)]">
  Content
</div>
```

---

## 2. 색상 (Colors)

### Primary (Brand) - 11단계 스케일

브랜드 메인 컬러로 `#3376f7`을 기준으로 합니다.

| Token | Value | 용도 |
|-------|-------|------|
| `--color-primary-50` | `#eff6ff` | 매우 밝은 배경 |
| `--color-primary-100` | `#dbeafe` | 밝은 배경, hover 상태 |
| `--color-primary-200` | `#bfdbfe` | 보더, 구분선 |
| `--color-primary-300` | `#93c5fd` | 비활성 요소 |
| `--color-primary-400` | `#60a5fa` | 호버 상태, 보조 강조 |
| `--color-primary-500` | `#3376f7` | **메인 브랜드 컬러** |
| `--color-primary-600` | `#2563eb` | 버튼 기본색 |
| `--color-primary-700` | `#1d4ed8` | 버튼 호버색 |
| `--color-primary-800` | `#1e40af` | 진한 강조 |
| `--color-primary-900` | `#1e3a8a` | 매우 진한 강조 |
| `--color-primary-950` | `#172554` | 가장 진한 배경 |

### Gray (Neutral) - 12단계 스케일

| Token | Value | 용도 |
|-------|-------|------|
| `--color-gray-0` | `#ffffff` | 흰색, 밝은 배경 |
| `--color-gray-25` | `#fcfcfd` | 매우 밝은 배경 |
| `--color-gray-50` | `#f9fafb` | 밝은 배경, 호버 |
| `--color-gray-100` | `#f2f4f7` | 카드 배경, 구분선 |
| `--color-gray-200` | `#eaecf0` | 보더, 구분선 |
| `--color-gray-300` | `#d0d5dd` | 비활성 보더 |
| `--color-gray-400` | `#98a2b3` | 비활성 텍스트, 아이콘 |
| `--color-gray-500` | `#667085` | 보조 텍스트 |
| `--color-gray-600` | `#475467` | 본문 텍스트 |
| `--color-gray-700` | `#344054` | 강조 텍스트 |
| `--color-gray-800` | `#1d2939` | 다크모드 배경 |
| `--color-gray-900` | `#101828` | 제목, 메인 텍스트 |
| `--color-gray-950` | `#0c111d` | 다크모드 메인 배경 |

### Success - 10단계 (Emerald Green)

| Token | Value | 용도 |
|-------|-------|------|
| `--color-success-50` | `#ecfdf5` | 성공 배경 |
| `--color-success-100` | `#d1fae5` | 밝은 성공 배경 |
| `--color-success-200` | `#a7f3d0` | 성공 보더 |
| `--color-success-300` | `#6ee7b7` | - |
| `--color-success-400` | `#34d399` | 다크모드 성공 텍스트 |
| `--color-success-500` | `#10b981` | 성공 메인 |
| `--color-success-600` | `#059669` | 성공 버튼 |
| `--color-success-700` | `#047857` | 성공 텍스트 |
| `--color-success-800` | `#065f46` | - |
| `--color-success-900` | `#064e3b` | - |

### Warning - 10단계 (Amber)

| Token | Value | 용도 |
|-------|-------|------|
| `--color-warning-50` | `#fffbeb` | 경고 배경 |
| `--color-warning-100` | `#fef3c7` | 밝은 경고 배경 |
| `--color-warning-200` | `#fde68a` | 경고 보더 |
| `--color-warning-300` | `#fcd34d` | - |
| `--color-warning-400` | `#fbbf24` | 다크모드 경고 텍스트 |
| `--color-warning-500` | `#f59e0b` | 경고 메인 |
| `--color-warning-600` | `#d97706` | 경고 버튼 |
| `--color-warning-700` | `#b45309` | 경고 텍스트 |
| `--color-warning-800` | `#92400e` | - |
| `--color-warning-900` | `#78350f` | - |

### Error - 10단계 (Red)

| Token | Value | 용도 |
|-------|-------|------|
| `--color-error-50` | `#fef2f2` | 에러 배경 |
| `--color-error-100` | `#fee2e2` | 밝은 에러 배경 |
| `--color-error-200` | `#fecaca` | 에러 보더 |
| `--color-error-300` | `#fca5a5` | - |
| `--color-error-400` | `#f87171` | 다크모드 에러 텍스트 |
| `--color-error-500` | `#ef4444` | 에러 메인 |
| `--color-error-600` | `#dc2626` | 에러 버튼 |
| `--color-error-700` | `#b91c1c` | 에러 텍스트 |
| `--color-error-800` | `#991b1b` | - |
| `--color-error-900` | `#7f1d1d` | - |

### Voting 전용 색상

거버넌스 투표에 사용되는 전용 색상입니다.

| Token | Value | 용도 |
|-------|-------|------|
| `--color-vote-for` | `#10b981` | 찬성(For) 투표 |
| `--color-vote-against` | `#ef4444` | 반대(Against) 투표 |
| `--color-vote-abstain` | `#94a3b8` | 기권(Abstain) 투표 |

---

## 3. 타이포그래피 (Typography)

### Font Family

```css
/* Sans-serif (본문, UI) */
font-family: 'DM Sans', sans-serif;

/* Monospace (코드, 숫자) */
font-family: 'Source Code Pro', monospace;
```

### Font Sizes

| Token | Value | px | 용도 |
|-------|-------|-----|------|
| `--font-size-xs` | `0.75rem` | 12px | 캡션, 보조 텍스트 |
| `--font-size-sm` | `0.875rem` | 14px | 버튼, 레이블 |
| `--font-size-base` | `1rem` | 16px | 본문 |
| `--font-size-lg` | `1.125rem` | 18px | 부제목 |
| `--font-size-xl` | `1.25rem` | 20px | 소제목 |
| `--font-size-2xl` | `1.5rem` | 24px | 섹션 제목 |
| `--font-size-3xl` | `1.875rem` | 30px | 페이지 제목 |
| `--font-size-4xl` | `2.25rem` | 36px | 큰 제목 |
| `--font-size-5xl` | `3rem` | 48px | 히어로 제목 |
| `--font-size-6xl` | `3.75rem` | 60px | 대형 디스플레이 |

### Font Weights

| Token | Value | 용도 |
|-------|-------|------|
| `--font-weight-normal` | `400` | 본문 |
| `--font-weight-medium` | `500` | 강조 본문, 레이블 |
| `--font-weight-semibold` | `600` | 버튼, 소제목 |
| `--font-weight-bold` | `700` | 제목, 강한 강조 |

### Line Heights

| Token | Value | 용도 |
|-------|-------|------|
| `--line-height-tight` | `1.25` | 제목 |
| `--line-height-snug` | `1.375` | 부제목 |
| `--line-height-normal` | `1.5` | 본문 |
| `--line-height-relaxed` | `1.625` | 긴 본문 |

### Letter Spacing

| Token | Value | 용도 |
|-------|-------|------|
| `--letter-spacing-tight` | `-0.025em` | 큰 제목 |
| `--letter-spacing-normal` | `0` | 일반 텍스트 |
| `--letter-spacing-wide` | `0.025em` | 대문자, 레이블 |

---

## 4. 스페이싱 (Spacing)

4px 기반 스케일을 사용합니다.

| Token | Value | px | 용도 |
|-------|-------|-----|------|
| `--space-0` | `0` | 0px | 없음 |
| `--space-0-5` | `0.125rem` | 2px | 최소 간격 |
| `--space-1` | `0.25rem` | 4px | 인라인 간격 |
| `--space-1-5` | `0.375rem` | 6px | 작은 간격 |
| `--space-2` | `0.5rem` | 8px | 아이콘-텍스트 간격 |
| `--space-2-5` | `0.625rem` | 10px | - |
| `--space-3` | `0.75rem` | 12px | 작은 패딩 |
| `--space-3-5` | `0.875rem` | 14px | - |
| `--space-4` | `1rem` | 16px | 기본 패딩 |
| `--space-5` | `1.25rem` | 20px | 중간 패딩 |
| `--space-6` | `1.5rem` | 24px | 카드 패딩 |
| `--space-7` | `1.75rem` | 28px | - |
| `--space-8` | `2rem` | 32px | 큰 패딩 |
| `--space-9` | `2.25rem` | 36px | - |
| `--space-10` | `2.5rem` | 40px | 섹션 간격 |
| `--space-12` | `3rem` | 48px | 큰 섹션 간격 |
| `--space-14` | `3.5rem` | 56px | - |
| `--space-16` | `4rem` | 64px | 페이지 간격 |
| `--space-20` | `5rem` | 80px | 대형 간격 |
| `--space-24` | `6rem` | 96px | 최대 간격 |

---

## 5. Border Radius

| Token | Value | px | 용도 |
|-------|-------|-----|------|
| `--radius-none` | `0` | 0px | 모서리 없음 |
| `--radius-xs` | `0.125rem` | 2px | 매우 작은 라운드 |
| `--radius-sm` | `0.25rem` | 4px | 작은 라운드 |
| `--radius-md` | `0.375rem` | 6px | 기본 라운드 |
| `--radius-lg` | `0.5rem` | 8px | 버튼, 인풋 |
| `--radius-xl` | `0.75rem` | 12px | 카드 |
| `--radius-2xl` | `1rem` | 16px | 모달 |
| `--radius-3xl` | `1.5rem` | 24px | 대형 카드 |
| `--radius-full` | `9999px` | - | 원형, 알약 형태 |

---

## 6. 그림자 (Shadows)

### Elevation System

| Token | Value | 용도 |
|-------|-------|------|
| `--shadow-xs` | `0 1px 2px 0 rgb(16 24 40 / 0.05)` | 미세한 입체감 |
| `--shadow-sm` | `0 1px 3px 0 rgb(16 24 40 / 0.1), 0 1px 2px -1px rgb(16 24 40 / 0.1)` | 카드 기본 |
| `--shadow-md` | `0 4px 6px -1px rgb(16 24 40 / 0.1), 0 2px 4px -2px rgb(16 24 40 / 0.1)` | 호버 상태 |
| `--shadow-lg` | `0 12px 16px -4px rgb(16 24 40 / 0.08), 0 4px 6px -2px rgb(16 24 40 / 0.03)` | 드롭다운 |
| `--shadow-xl` | `0 20px 24px -4px rgb(16 24 40 / 0.08), 0 8px 8px -4px rgb(16 24 40 / 0.03)` | 모달 |
| `--shadow-2xl` | `0 24px 48px -12px rgb(16 24 40 / 0.18)` | 팝오버 |
| `--shadow-3xl` | `0 32px 64px -12px rgb(16 24 40 / 0.14)` | 대형 오버레이 |

### Focus Ring Shadows

| Token | Value | 용도 |
|-------|-------|------|
| `--ring-primary` | `0 0 0 4px rgb(51 118 247 / 0.24)` | 기본 포커스 링 |
| `--ring-error` | `0 0 0 4px rgb(240 68 56 / 0.24)` | 에러 상태 포커스 |
| `--ring-gray` | `0 0 0 4px rgb(152 162 179 / 0.14)` | 중립 포커스 링 |

### 다크 모드 그림자

다크 모드에서는 더 강한 그림자를 사용합니다:

```css
.dark {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.2);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 12px 16px -4px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.2);
  --shadow-xl: 0 20px 24px -4px rgb(0 0 0 / 0.3), 0 8px 8px -4px rgb(0 0 0 / 0.2);
}
```

---
