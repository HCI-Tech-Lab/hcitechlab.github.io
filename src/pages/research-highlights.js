import ResearchHeader from '@/components/research_header';
import HighlightedPublications from '@/components/highlighted_publications';

export default function ResearchHighlights() {
  return (
    <>
      <ResearchHeader current="highlights" />
      <div className="pb-5">
        <HighlightedPublications />
      </div>
    </>
  );
}
