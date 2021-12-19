import styled from 'styled-components'

export const ArticleItemWrapper = styled.div`
  padding: 12px 20px 0;
  background: #fff;
  cursor: pointer;
  height: 141px;

  &:hover {
    background: #fafafa;

    .title {
      color: #1890ff !important;
    }
  }

  .meta-container {
    display: flex;
    color: #86909c;

    .category:hover,
    .username:hover {
      color: #1890ff;
    }

    .username {
      margin-right: 8px;
      max-width: 162px;
      font-size: 13px;
      line-height: 22px;
      color: #4e5969;
    }

    .release-time {
      position: relative;
      padding: 0 10px;
      line-height: 22px;
      font-size: 13px;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        background: #e5e6eb;
        transform: translateY(-50%);
        width: 1px;
        height: 14px;
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }

    .category {
      font-size: 13px;
      line-height: 22px;
      padding: 0 8px;
      color: #86909c;
    }
  }

  .content-container {
    display: flex;
    padding-bottom: 12px;
    margin-top: 10px;
    border-bottom: 1px solid #e5e6eb;

    .main-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      overflow: hidden;

      .title {
        width: 100%;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        transition: color 0.3s;
      }

      .abstract {
        width: 100%;
        margin-bottom: 10px;
        color: #86909c;
        font-size: 13px;
        line-height: 22px;
      }
    }

    .img-wrapper {
      flex: 0 0 auto;
      width: 120px;
      height: 80px;
      margin-left: 24px;
      overflow: hidden;
      border-radius: 2px;

      .news-img {
        width: 120px;
        height: 100%;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .action-list {
      .item {
        margin-right: 20px;

        .read-num {
          color: #4e5969 !important;
        }

        &:hover {
          .unlike-icon {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKYSURBVHgB7VddbtNAEJ7ZdVJFtMKPSE2EjxBOgHOChhOQnCDilTaqoYLncIK2J6g5QZ0bpCeoVUDi0RCkQOzdZfyTHztO5brFPMD3EI1ndmc+r+dnA/CvA+GeaA1nPQB2QK50peAq0MToq9Vwi+6/F4HmkX+MqKyM2vW56BQlwaAknlgzYxVc9JUUHUSY0INRE/y0qJ/SBGoBayei8+mkcfb5XcNhrNahI/VIZzYPZ2YRP6UJELrhj5JqvFC4FnpSwXmkB2wXcVKeAMLzKJBCO6VXyovNqBdxU4pAnPloUNZPvryvT1JGLBa4NIEw+WjbcbSZsVHWTol5EEvSgQK4EwHdUroW8Iv47ZV981Y7X7c3D30ztJHohklZxKcGBbH/et7DwB9QqYXJ5WqafJVdg0yeJq1Fbw1/XW96wbBH9Nd7BGbfgJwMYC2BptPai73duUlne5GoXE6Nxs1pNHFQNOB2eFJAZ5E7yxOIGotQl9nm+GjP70ohgXFOT3LM+U7XtepenmfO688Afm5JQqEHQb1HJzhgHOgloZ8iQI3FimMrW0n5AZlGi1Q37YRdh7UOW5DYttrphG1AFQY3lh5XZnwahafgUQIp+Q0eGIyJRXNycwj8eSjF4hJFZldOwKASpk9shvL0Ox9XTkAEVEkxHG+0yqMqP0GU0FLKj+vK6ggkwwsUc6BqAvvWvL1o0dnhVQkBLqSZiE7WVgmBvPKrjMC28tskgHFpIK89hgeElP7LREyV3wLLWUAt+AoZdkmwW8O5Q6q8O51JtksoCLoxhf8VIj+I7CxvTXocH81H4bRKOaHrdrSQ8cKBN4OoNzcnO1a+LQODxnLgx9NKqwnPtXYnsf5HO/D5ne574X4a6O5tE/Q//jp+A4uQ/sJMdO/iAAAAAElFTkSuQmCC');
          }

          span {
            color: #1890ff;
          }

          .uncomment-icon {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALDSURBVHgB7ZZdTttAEMdnd+0UikB+rASl5gRNb5CcAHqCkhOQ51IaA6Kv7Q0IJ6CcoOEGcALcAlLfaolKlNi705m1Q53UBhKMeOEvRd74Y+a3s7szA/CkJz2yBIyp+ff9Ol3qQqAvpHjF99Dgd6nUiU7M8fmn2tE49u4E4AXozZlkDRHb/PeW10P69WKlN38G0yHcF2DxY9wZdowhfdbjWSOa0BoRkqIBr2lI0RH+tXEhgh9b7iZMAvAiuPSdRO0LwUatumj03tnOdA9u0ML6ZYOAVsn7u+xWSNFolkVDlDl3tfyWzSYkx63bHI/KJxs6Z6MMQhZ9PHCOCEdKuW/Gdc4KyZlSpkkR5E1po+m10bsVYOFD3BlQO45+GwYiggnFEFK6Td43vJRzs/326DtDS5CGXp3wWCm9FN5hF99Fdl9IRVGF6OLCXYq+/JvUUARcDY10ZA6qcs6yS4jQo6E3M3O1mn82vASo0p0rnF2oWIZOkHUo5XIpwODIKRkfQ8VyazYCrHopAGbJpsrwD5Sz6ZUCDFR0XB5KIwCcZgFmnsc+VKz5wBYx4NxSDoBwyBelcAUqltKmwdcsMRUDUHHpphxiDSrWtU0hv5YCpCnXLoO3uHEVQEXKZ9fTLeegFMCSGtOClLjDGQzuKc6u1LwEqW3dGn3+HwBHgWq9reGUPvcXN/604R5yYsfPhr2iolZ4DM92ngUZhIcgP7/c6O/yTGASADcJs6Ff9PzGjmhh/Sqgvq+Tu0VNidj77TpH0UiV5LZtNtENEIZTLYVddvsyPpyCqUjr+Be/c7pdE2MBWGxuLBIZ5DqcTBgiphC0xl6+FRtRj5zUOctSb0EVVoRjAeRBjFHLaGCFvmoUvBLZJIN4KCT3ilx0xFA+MQCt8+1adyKAIqAkpk7H1RQFFRXVj7QtI1iuslTojIbmuG37kx5cfwGYmi/QPMKjGgAAAABJRU5ErkJggg==');
          }
        }

        i {
          width: 16px;
          height: 16px;
          background-size: 100%;
        }

        span {
          margin-left: 4px;
          font-size: 13px;
          line-height: 20px;
          color: #4e5969;

          &.active {
            color: #1890ff;
          }
        }

        .read-icon {
          background-image: url('https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png');
        }

        .unlike-icon {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7VZNbtNQEP7GP7AkN8DcoJyA5gRNTwCR2kqsUm9YEKEaoZRl0hUSBLWcAHOCpjdIT1AfIewgTjzM+AccxwHXLRYS/STnvbyxZ743b34e8L+DcEMMhu+fERk7DLTAuAwRjjz3eVD1+xsROD75eARmr7AczDlsVyVhoCbeDt85mXHmqLtkbst0Ko9jk31aVU9tAgvYW7FxYNJ3D85eufuTOZtKYiZu3X4z/LBdRU9tAia4E0+YL7I1z+3OmPEpkWOrip7aBED0RAcb7K8KeBb/alD+LQIa+TI48kxfuAfTVSlVMlybgAafpN1RYgujopwIOzpGEhuogGuloTc8bd2j5TmS8/VfHu7t5uUaeCaRygORPaqi00JFJAVn2UuNa667xXfEeJZ+rePR+Kool7gIQg67+RpBJTvo5QMoZHPXxFLW8Tld2lhoUqMOfg/JlKjdT2Pnpwf0bDlx3worG1EnPlENF0m5OayO5+7NyjRLHXgMfCsNQhumrBviRfRAhnqyu0KAYXmpcX/BfKKekL+dvBIheOUddkuNK7QO6A43ycXDvolYr5OtGTnlD3VU41rVZLdfccvIipMYDdYINAHZZJyicgR+4wQ0hbVH6Px7RBeNE9BM0lGbVxorTRNImhcxf8mvNxcDafOywBM0TUCqqEa/I09QbF6NECDQdjKuN6hGCJSlX2MENqXfGgFKS6hlmA9wi7hvLJ/qWEy/DL96AfMlEXWkU/mD0XiCkjud7kRk56iOltwRYz3ShM7KXlhpx4PheBR3qxzS6zbSi0YtyOZe9919D38ioNC2vIDl6NyQC2bWtzWVomvf93gWwg7KXH+HfwY/AGsn+Lf3Dim6AAAAAElFTkSuQmCC');
        }

        .like-icon {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG1SURBVHgB7ZdbTsJAFIb/MwWMEZI+moix7oAdCCsQdwAr4F00VI0+4wrUFagrAHcAO5h4SXxsxISEtjNOJZByCRTo5UG/J+YMw3y055xpgb8OYUP2z/sVgB2rn9KlRNdJuc1Pc5sHXb+RQP7MbhBJcyrMbc0tBZVgWJNds2/M2dzDSLvaHQKytkDaYYUF08V8vV9ElAKK8qJJCVokGIIA4WjxNOmISmCY+WQgBFYW8JJPLWss/6ZoIwArlaFuSj3r2C0iLLu//O0qc4gwBfZOBxViqAXY3MNSaWjN2c7rEVV/j5gQyNftIjFRgy+Ber30SS47KILoEeFgCRelj5tMxxukRtHfxuLK1vRF2cnZZeEKME1DSOhMg/qTqHqDcRKqxmIiPozRB18V0AHig2NWIEaIPSFJgd6X9oIEBdpWk6zEBIQQz/5x/FdAsjYSFOCjBpSUQHs6EK+Ar/wSEfCX36wAkYVomSi/GQEpRBcRQsTu58XHAu/XW6Z6sbidWShcrp4BODbZHPLi9TL1MH9uCkMdy449PK1SadfiZrYzjH8XHFsL9KA5wluvDnTOzchv7z/r8wP0gYciEk0ZYQAAAABJRU5ErkJggg==');
        }

        .uncomment-icon {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKRSURBVHgB7VZNbtpQEJ55BlR15RvUOUHTG5ATJD1BQ9NU6gq8JKiKoyrJ0u2qUmkFOUGaE5TegJwg7gnqLRh7MvMwwiDbYHCUDZ9kHph5M9+bN38AO+zwzEAoiEv3xz4v/KAFiK/0S6J/qPCBoui+Y38cFlC3HgHH7Zk1FTXZUIt/mivEPVY6GFFw4difPNiWwNW3X+dLhj1iA3JqProXq7EQ8TVoz4A1147OWfPkAjYhcO1+twirt7FSEexPiG4+26cDyMEXt1s3AI7Z+LsZ4TEFB1newBzjf2B6Gi8kaqwyvEpHFgmVtjmxcTgm401R44I2G0M2KjpEV5W9KbG0koC+8znrt47d8GFDCAk+gJCQwNyvwqS1LLNwBbHbHuQ7G99bJ4rXgY4LRPGqz4T2koda8EAERl2zIrory7hArlBnDmdSDSbHyf8WrwDVNHKV0YOyQdGNXhAPMwlgnHKjaHQPJUNBOEjamL9fhI7SMt0/Q3uu08wjoJGWLk+FZQKefLyEwIKSETcxwTCbANFfWQLAIygZCFifrjkEQq73WgixCaUziHWi+p1JIC65Hj/mpdt1oCQkq2u7+f4uk4BAGo8minguFQy2hFRXvlonqTuXgK5aRLqHc/m8vXK7LdgCE6hYskolTGtqqWnYsU+dmITJrnCvv/7sOXKSDVCBiScrJgeVBHInIokDuYqEsB5KQqgMl7uk1A4DwrpCkFLLExL0x1HAWfXCr2H4X2TOWh+wEAGB7pBQcRITzgwymvmxEilcVtp+cX1cfs20Drv2VKyDSVUPI4Ij3lRPEfFJclzXEvIQlXhioZ4QYaNjn/Q3IrAMiQmDA0wB+QGEflr/ENK6xXOXFS8QRQdFx/YdnhyP1D0hcwr1KvEAAAAASUVORK5CYII=');
        }

        .collect-icon {
          background-image: url(${require('../../../../assets/user-center/collect.png')
            .default});
        }

        .collect-num {
          color: #4e5969 !important;
        }
      }
    }
  }
`
