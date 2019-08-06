import * as React from 'react';
import {Gene} from "../../../shared/api/generated/CBioPortalAPI";
import { If, Then, Else } from 'react-if';
import * as _ from 'lodash';
import IFrameLoader from "../../../shared/components/iframeLoader/IFrameLoader";
import {observer} from "mobx-react";

export type IGeneProps = {

    genes:Gene[];
    iframeHeight: number;
    iframeStyle?:{[styleProp:string]:any};

}


@observer
export default class PreMedKBViewer extends React.Component<IGeneProps, { geneUrl:string; }> {
    geneSelectList:any;

    constructor(props: IGeneProps){

        super(props);

        this.state = { geneUrl: this.buildGeneQueryUrl(props.genes[0]) }

        this.handleSelection = this.handleSelection.bind(this);

    }

    buildGeneQueryUrl(gene: Gene):string {
        var baseUrl = "http://www.fudan-pgx.org/premedkb/index.html#/search/result";
        var label = "?view=widget";
        var queryStr = "&queryType=3&num=1&step=1&term=%27" + gene.hugoGeneSymbol + "%27%5Bgene%5D";
        return baseUrl + label + queryStr

    }

    handleSelection(){
        let gene = this.props.genes[this.geneSelectList.selectedIndex];
        this.setState({ geneUrl: '' });
        setTimeout(()=>{
            this.setState({ geneUrl: this.buildGeneQueryUrl(gene) });
        },100)
    }

    render(){

        return (<div>

            <If condition={this.props.genes.length >= 1}>
                <select ref={(el)=>this.geneSelectList = el} style={{ marginBottom: 5 }} onChange={ this.handleSelection }>{  _.map(this.props.genes, (gene: Gene)=>
                    <option value={gene.hugoGeneSymbol}>{gene.hugoGeneSymbol}</option>)    }
                </select>
            </If>
            <span>Precision Medicine KnowledgeBase(PreMedKB)</span>
            <IFrameLoader height={this.props.iframeHeight} url={ this.state.geneUrl } />

        </div>)

    }
}
