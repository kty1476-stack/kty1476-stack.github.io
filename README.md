# Chirpy Starter

[![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy)][gem]&nbsp;
[![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

A minimal, ready-to-use template for creating a blog with the [**Chirpy**][chirpy] Jekyll theme. Get up and running in minutes with all critical files pre-configured.

## Why This Starter Exists

When installing Chirpy through [RubyGems.org][gem], Jekyll can only read a subset of theme files (`_data`, `_layouts`, `_includes`, `_sass`, `assets`) and limited `_config.yml` options from the gem. As a result, users cannot enjoy the full out-of-the-box experience that Chirpy offers.

To unlock all features, the following files must be present in your Jekyll site:

```shell
.
├── _config.yml
├── _plugins
├── _tabs
└── index.html
```

This starter bundles those files from the latest **Chirpy** release along with a [CD][CD] workflow, so you can start writing immediately.

## Usage

### 맛집 지도 유지관리

- 오른쪽 인기 태그 위에 지도 미리보기 링크를 표시합니다. 사진 또는 문구를 클릭하면 `/food-map/`으로 이동합니다. 홈 글 목록 안에는 지도와 지도 스크립트를 삽입하지 않습니다. 모바일에서는 기존 왼쪽 메뉴의 맛집 지도를 이용합니다.
- 좌표 출처는 데이터에 보관하되 방문자 화면에는 출처 링크를 표시하지 않습니다. 지도 제공자의 필수 저작권 표시는 유지합니다.

- `/food-map/`은 공개된 맛집 게시글을 자동으로 읽습니다. 정부지원금과 hidden 글, Jekyll이 제외한 미래 글은 표시하지 않습니다.
- `_data/food_locations.json`의 키는 게시글 파일명에서 날짜와 확장자를 뺀 slug입니다. 새 맛집은 이름과 주소부터 기록합니다.
- `lat`, `lng`는 상호·지점·주소를 대조한 공개 좌표만 사용합니다. 좌표 출처 URL을 `source`, 확인 날짜를 `checked`에 기록합니다. 도로/지역 중심점, 동명 타 지점, 추측 좌표는 사용하지 않습니다.
- 매장 POI는 `precision: place`, 정확한 주소지 건물은 `precision: building`입니다. 건물 기준은 화면에도 표시합니다. 출입구 위치까지 확인했다는 의미는 아닙니다.
- 좌표를 확인하지 못하면 lat/lng를 생략하고 `status: pending`으로 유지합니다. 글은 ‘위치 확인 중’ 목록에 표시됩니다. 기존 주소와 지도 자료가 다르면 먼저 출처를 재검증합니다.
- 썸네일·제목·게시글 URL은 Jekyll 데이터에서 가져오므로 지도용으로 복제하지 않습니다.
- 바탕지도는 OpenStreetMap 표준 타일이며 화면에 보이는 타일만 일반 브라우저 캐시로 읽습니다. 일괄 다운로드·오프라인 저장·타일 프리패치는 하지 않습니다. 출처 표기를 유지하세요.
- 주소 조회 API는 방문자 화면에 포함하지 않습니다. 최초 좌표 조사 캐시는 작업 기록에 보관하며, 추후 조회는 공급자 이용 정책과 제한을 확인해 진행합니다.
- 새 좌표를 추가한 뒤 JSON 파싱, 게시글/이미지 경로, 한국 영역 좌표, 모바일 검색·필터·핀·링크를 확인합니다.

Check out the [theme's docs](https://github.com/cotes2020/jekyll-theme-chirpy/wiki).

## Contributing

This repository is automatically updated with new releases from the theme repository. If you encounter any issues or want to contribute to its improvement, please visit the [theme repository][chirpy] to provide feedback.

## License

This work is published under [MIT][mit] License.

[gem]: https://rubygems.org/gems/jekyll-theme-chirpy
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[CD]: https://en.wikipedia.org/wiki/Continuous_deployment
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE


### 게시글과 썸네일 안내 문구 (2026-10-02)

- 글 본문·요약·이미지 설명·캡션과 썸네일 이미지 안에 AI 제작 안내 문구를 넣지 않습니다.
- 이미지의 음식·주제·프로그램·매장명은 정확히 표시합니다. 실제 방문 후기나 매장 촬영 사진, 공식 기관 홍보물이라고 허위로 소개하지 않습니다.
- 방송·공식 자료 기반 안내와 가격·운영 정보 변동 가능성 안내는 본문 마지막에 유지합니다.
