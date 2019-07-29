import * as React from 'react';
import {PathwayRecord} from "../../../shared/model/PathwayRecord";
import { If, Then, Else } from 'react-if';
import * as _ from 'lodash';
import IFrameLoader from "../../../shared/components/iframeLoader/IFrameLoader";
import {observer} from "mobx-react";

export type IPathwayProps = {

    pathways:PathwayRecord[];
    iframeHeight: number;
    iframeStyle?:{[styleProp:string]:any};

}


@observer
export default class PathwayViewer extends React.Component<IPathwayProps, { pathwayUrl:string; }> {
    pathwaySelectList:any;

    constructor(props: IPathwayProps){

        super(props);

        this.state = { pathwayUrl: this.buildPathwayUrl(props.pathways[0]) }

        this.handleSelection = this.handleSelection.bind(this);

    }

    buildPathwayUrl(pathway: PathwayRecord):string {
        var baseUrl = "https://www.wikipathways.org/index.php/";
        var label = "?view=widget"
        var colorStr = "&green=" + pathway.hugoGeneSymbol;
        var pathwayIdStr = "Pathway:" + pathway.pathwayId;
        return baseUrl + pathwayIdStr + label + colorStr

    }

    handleSelection(){
        let pathway = this.props.pathways[this.pathwaySelectList.selectedIndex];
        this.setState({ pathwayUrl: this.buildPathwayUrl(pathway) });
    }

    render(){

        return (<div>

            <If condition={this.props.pathways.length >= 1}>
                <select ref={(el)=>this.pathwaySelectList = el} style={{ marginBottom: 5 }} onChange={ this.handleSelection }>{  _.map(this.props.pathways, (pathway: PathwayRecord)=>
                    <option value={pathway.pathwayId}>{pathway.pathwayName}</option>)    }
                </select>
            </If>

            <IFrameLoader height={this.props.iframeHeight} url={ this.state.pathwayUrl } />

        </div>)

    }
}
