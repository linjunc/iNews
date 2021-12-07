import styled from "styled-components";

export const ArticleContainer = styled.aside`
    .author-article {
            display: flex;
            margin: 20px 0;
            cursor: pointer;
            .article-list-img {
                margin-right: 10px;
                img {
                    width: 94px;
                    height: 70px;
                }
            }
            .article-list-right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .article-list-title {
                    max-height: 48px;
                    font-size: 16px;
                    line-height: 24px;
                    color: #222;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }
                .article-list-num {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #999999;
                }
            }
        } 
`