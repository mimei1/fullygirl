import { FC } from 'react'

const SVGFilters: FC = () => (
    <svg style={{ position: 'absolute', pointerEvents: 'none', bottom: '100%' }}>
        <defs>
            <filter id="disabled-inset-filter" x="0" y="0" width="1px" height="1px">
                <feColorMatrix in="SourceGraphic" type="matrix" values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        -2 -2 -2 4 0
                    " result="dark-parts-isolated"></feColorMatrix>
                <feFlood result="shadow-color" floodColor="rgb(128, 128, 128)"></feFlood>
                <feFlood result="hilight-color" floodColor="rgb(255, 255, 255)"></feFlood>
                <feOffset in="dark-parts-isolated" dx="1" dy="1" result="offset"></feOffset>
                <feComposite in="hilight-color" in2="offset" operator="in" result="hilight-colored-offset"></feComposite>
                <feComposite in="shadow-color" in2="dark-parts-isolated" operator="in" result="shadow-colored"></feComposite>
                <feMerge>
                    <feMergeNode in="hilight-colored-offset"></feMergeNode>
                    <feMergeNode in="shadow-colored"></feMergeNode>
                </feMerge>
            </filter>
        </defs>
    </svg>
)

export default SVGFilters
