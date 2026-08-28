import { Container } from "@/components/Container/Container";
import {
  Breadcrumb,
  type Crumb,
} from "@/components/Breadcrumb/Breadcrumb";
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
  breadcrumbs?: Crumb[];
  children: React.ReactNode;
};

export function ContentPage({
  eyebrow = "Trenova",
  title,
  lead,
  breadcrumbs,
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
          {breadcrumbs?.length ? <Breadcrumb items={breadcrumbs} /> : null}
          <Main>{children}</Main>
        </Container>
      </Body>
    </PageRoot>
  );
}
