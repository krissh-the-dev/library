import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { AddButton, Container, Heading, SubHeading } from '../components/styled';

export default function book() {
  const { query } = useRouter();

  const getBookDetailsQuery = gql`
    {
      book(id: "${query.id}") {
        name,
        genre,
        author {
          name,
          age,
          sex,
          id,
          books {
            name
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getBookDetailsQuery);

  return (
    <>
      {loading && (
        <>
          <Head>
            <title>Loading</title>
          </Head>
          <Heading>Loading</Heading>
        </>
      )}
      {error && (
        <Container>
          <Head>
            <title>Error</title>
          </Head>
          <Heading>Error</Heading>
          <p>{JSON.stringify(error)}</p>
        </Container>
      )}
      {!!data && data.book && (
        <>
          <Container>
            <Head>
              <title>{data.book.name}</title>
            </Head>
            <Heading>{data.book.name}</Heading>
            <Details>
              <Detail>
                <div>Genre</div>
                <div>{data.book.genre}</div>
              </Detail>
              <Detail>
                <div>Author</div>
                <div>{data.book.author.name}</div>
              </Detail>

              <SubHeading>More about {data.book.author.name}</SubHeading>
              <Detail>
                <div>Age</div>
                <div>{data.book.author.age}</div>
              </Detail>
              <Detail>
                <div>Gender</div>
                <div>{data.book.author.sex}</div>
              </Detail>
              <Detail>
                <div>Other books by author</div>
                <div>
                  {data.book.author.books.map((book, index) => {
                    return book.name + (index !== data.book.author.books.length - 1 ? ', ' : '');
                  })}
                </div>
              </Detail>
            </Details>
          </Container>
          <AddButton>+</AddButton>
        </>
      )}
    </>
  );
}

const Details = styled.div`
  display: flex;
  width: 50%;
  margin: 1rem auto;
  flex-direction: column;

  @media (max-width: 700px) {
    width: 100%;
  }

  @media (max-width: 800px) {
    width: 95%;
  }

  @media (max-width: 1000px) {
    width: 80%;
  }
`;

const Detail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 1rem 0;
  font-size: 1.4rem;

  & > div:nth-child(odd) {
    /* text-align: right; */
  }
`;
