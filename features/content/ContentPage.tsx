import { Container } from "@/components/Container/Container";
import {
  Body,
  Eyebrow,
  Hero,
  HeroInner,
  HeroLead,
  HeroTitle,
  Main,
  PageRoot,
} from "@/features/content/ContentPage.styles";

type ContentPageProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  children: React.ReactNode;
};

export function ContentPage({
  eyebrow = "Trenova",
  title,
  lead,
  children,
}: ContentPageProps) {
  return (
    <PageRoot>
      <Hero>
        <Container>
          <HeroInner>
            <Eyebrow>{eyebrow}</Eyebrow>
            <HeroTitle>{title}</HeroTitle>
            <HeroLead>{lead}</HeroLead>
          </HeroInner>
        </Container>
      </Hero>

      <Body>
        <Container>
          <Main>{children}</Main>
        </Container>
      </Body>
    </PageRoot>
  );
}
