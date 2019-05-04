import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },

    chip: {
        marginRight: '5px',
    },

    card: {
        width: '100%',
        margin: '8px',
    },

    loader: {
        float: 'right'
    },

    userAvatar: {
        width: 30,
        height: 30,
        margin: '3px',
        marginBottom: '7px'
    },

    avatar: {
        fontSize: '11px',
        color: '#fff',
        backgroundColor: '#3f51b5',
    },
});

class ResultCard extends React.Component {

    componentDidMount() {
        const { fetchForks, id } = this.props;
        fetchForks(id);
    }

    render() {
        const { gistname, username, fileTypes, classes, forks, loading } = this.props;

        const fileTypeChips = fileTypes.map((fileType, i) => {
            return <Chip
                key={i}
                avatar={
                    <Avatar className={classes.avatar}>
                        {fileType.shortname}
                    </Avatar>
                }
                label={fileType.name}
                className={classes.chip}
                component="a"
                href="#"
                clickable
                variant="outlined"
            />;
        }, this)

        const forkAvatars = forks.map((fork, i) => {
            return <Avatar
                key={i}
                alt={fork.name}
                src={fork.avatar_url}
                className={classes.userAvatar}
            />;
        }, this)

        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {gistname}
                            <Typography component="p">
                                {username}
                            </Typography>
                        </Typography>
                        {fileTypeChips}
                        <div className={classes.loader}>
                            <Typography component="p" style={{ textAlign: 'right' }}>
                                {'Forks'}
                            </Typography>
                            <div style={{ display: 'flex' }}>
                                {loading
                                    ? <CircularProgress size={14} />
                                    : forkAvatars.length > 0
                                        ? forkAvatars
                                        : 'There are no forks for this Gist'}
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles)(ResultCard);
